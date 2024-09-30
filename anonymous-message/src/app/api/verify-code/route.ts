import connectDB from "@/lib/dbConfig";
import userModel from "@/models/user.model";
import z from 'zod';
import { verifySchema } from "@/schemas/verifySchema";

// Validation schema for the incoming request
const verifyQuerySchema = z.object({
    username: z.string(),
    code: z.string(),
});

export async function POST(request: Request) {
    await connectDB();

    try {
        const { username, code } = await request.json();

        console.log({ username, code });

        // Validate the incoming request body
        const result = verifyQuerySchema.safeParse({ username, code });
        if (!result.success) {
            return new Response(JSON.stringify({
                message: result.error.format().code?._errors[0] || "Invalid data",
                success: false
            }), {
                status: 400
            });
        }

        const { username: parsedUsername, code: parsedCode } = result.data;

        // Find the user in the database
        const existingUser = await userModel.findOne({ username: parsedUsername });
        if (!existingUser) {
            return new Response(JSON.stringify({
                message: "User not found",
                success: false
            }), {
                status: 404
            });
        }

        // Check if user is already verified
        if (existingUser.isVerified) {
            return new Response(JSON.stringify({
                message: "User already verified",
                success: false
            }), {
                status: 400
            });
        }

        // Compare the verification code
        if (existingUser.verifyCode !== parsedCode) {
            return new Response(JSON.stringify({
                message: "Invalid verification code",
                success: false
            }), {
                status: 400
            });
        }

        // Check if the code has expired
        const isCodeNotExpired = new Date(existingUser.verifyCodeExpiry) > new Date();
        if (!isCodeNotExpired) {
            return new Response(JSON.stringify({
                message: "Verification code expired",
                success: false
            }), {
                status: 400
            });
        }

        // Mark the user as verified
        existingUser.isVerified = true;
        existingUser.verifyCode = ""; 
        await existingUser.save();

        return new Response(JSON.stringify({
            message: "User verified",
            success: true
        }), {
            status: 200
        });

    } catch (error) {
        console.log("Error in verifying code:", error);

        return new Response(JSON.stringify({
            message: "Something went wrong in verifying code",
            success: false
        }), {
            status: 500
        });
    }
}
