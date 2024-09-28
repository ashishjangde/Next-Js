import { auth } from "@/auth"
import connectDB from "@/lib/dbConfig"
import userModel from "@/models/user.model";
import { User } from "next-auth";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import z from 'zod'


const acceptQuerySchema = z.object({
    acceptMessages: acceptMessageSchema
})

export async function POST(request: Request) {
    await connectDB();

    const session = await auth()
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

    const user : User = session.user
    const userId = user._id

    


    try {
        const {isAcceptingMessages} = await request.json();
        const result = acceptQuerySchema.safeParse(isAcceptingMessages);
        if (!result.success) {
            return Response.json(
                {
                    message: result.error.format().acceptMessages?._errors[0],
                    success: false,
                    data: null
                },
                {
                    status: 400
                }
            );
        }

        const { acceptMessages } = result.data;
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { isAcceptingMessages: acceptMessages },
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
        )
    } catch (error) {
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

    const session = await auth()
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

    const user : User = session.user
    const userId = user._id

    try {
        const existingUser = await userModel.findOne({ _id: userId }).select("-password -verifyCode -verifyCodeExpiry -__v");
        if (!existingUser) {
            return Response.json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            );
        }

        return Response.json(
            {
                message: "User fetched successfully",
                success: true,
                data: existingUser
            }
        )
    } catch (error) {
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