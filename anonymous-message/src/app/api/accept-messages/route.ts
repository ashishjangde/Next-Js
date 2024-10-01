import { auth } from "@/auth";
import connectDB from "@/lib/dbConfig";
import userModel from "@/models/user.model";
import { User } from "next-auth";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"; // If this is necessary
import z from 'zod';

const acceptQuerySchema = z.object({
    acceptMessages: z.object({
        isAcceptingMessages: z.boolean() // Ensure this matches your expected payload structure
    })
});

export async function POST(request: Request) {
    await connectDB();

    const session = await auth();
    if (!session) {
        return Response.json(
            {
                message: "Not authenticated",
                success: false,
                data: null
            },
            {
                status: 401
            }
        );
    }

    const user: User = session.user;
    const userId = user._id;

    try {
        const body = await request.json(); 
        const result = acceptQuerySchema.safeParse(body); 

        if (!result.success) {
            return Response.json(
                {
                    message: result.error.format().acceptMessages?._errors[0] || "Invalid request payload",
                    success: false,
                    data: null
                },
                {
                    status: 400
                }
            );
        }

        const { isAcceptingMessages } = result.data.acceptMessages; // Access the correct nested property
        console.log(isAcceptingMessages);
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { isAcceptingMessages: isAcceptingMessages },
            { new: true }
        ).select("-password -verifyCode -verifyCodeExpiry -__v");

        if (!updatedUser) {
            return Response.json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                },
                {
                    status: 404
                }
            );
        }

        return Response.json(
            {
                message: "User updated successfully",
                success: true,
                data: updatedUser
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Error processing request:", error); // Logging the error for debugging
        return Response.json(
            {
                message: "Something went wrong in Accepting the messages POST",
                success: false,
                data: null
            },
            {
                status: 500
            }
        );
    }
}

export async function GET(request: Request) {
    await connectDB();

    const session = await auth();
    if (!session) {
        return Response.json(
            {
                message: "Not authenticated",
                success: false,
                data: null
            },
            {
                status: 401
            }
        );
    }

    const user: User = session.user;
    const userId = user._id;

    try {
        const existingUser = await userModel.findOne({ _id: userId }).select("-password -verifyCode -verifyCodeExpiry -__v");
        if (!existingUser) {
            return Response.json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                },
                {
                    status: 404
                }
            );
        }

        return Response.json(
            {
                message: "User fetched successfully",
                success: true,
                data: existingUser
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Error processing request:", error); // Logging the error for debugging
        return Response.json(
            {
                message: "Something went wrong in Accepting the messages GET",
                success: false,
                data: null
            },
            {
                status: 500
            }
        );
    }
}
