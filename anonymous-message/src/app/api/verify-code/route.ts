import connectDB from "@/lib/dbConfig";
import userModel from "@/models/user.model";
import z from  'zod'
import { verifySchema } from "@/schemas/verifySchema";


const verifyQuerySchema = z.object({
    verifyCode: verifySchema,
})

export async function GET(request:Request) {
    await connectDB();

    try {
        const {username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);
        // validate with zod
        const result = verifyQuerySchema.safeParse(code);
        if(!result.success) { 
            return Response.json({ message: result.error.format().verifyCode?._errors[0] , success: false }, { status: 400 });
        }

        const { verifyCode } = result.data;

        const  stringCode = verifyCode.toString();

        const existingUser = await userModel.findOne({ username: decodedUsername });
        if (!existingUser) {
            return Response.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (existingUser.isVerified) {
            return Response.json({ message: "User already verified", success: false }, { status: 400 });
        }

        if (existingUser.verifyCode !== stringCode) {
            return Response.json({ message: "Invalid verification code", success: false }, { status: 400 });
        }
        const isCodeNotExpired = new Date(existingUser.verifyCodeExpiry) > new Date();
        if (!isCodeNotExpired) {
            return Response.json({ message: "Verification code expired", success: false }, { status: 400 });
        }

        existingUser.isVerified = true;
        existingUser.verifyCode = "";
        await existingUser.save();

        return Response.json({ message: "User verified", success: true }, { status: 200 });

    } catch (error) {
        console.log("Error in verifying code:", error);
        
        return Response.json(
            {
                message: "Something went wrong in verifying code",
                success: false,
                data: null
            },
            {
                status: 500
            });
    }
}