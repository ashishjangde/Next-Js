import { NextResponse } from "next/server";
import userModel from "@/models/user.model";
import messageModel from "@/models/message.model";
import connectDB from "@/lib/dbConfig";
import { auth } from "@/auth";



export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
    await connectDB();
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
        success: false,
        data: null,
      },
      { status: 401 }
    );
  }

  const { user } = session;
  const userId = user?._id;  

  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID not found",
        success: false,
        data: null,
      },
      { status: 401 }
    );
  }

  const { messageId } = params;

  if (!messageId) {
    return NextResponse.json(
      {
        message: "Invalid request payload",
        success: false,
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const existingUser = await userModel.findOne({ _id: userId }).select("-password -verifyCode -verifyCodeExpiry -__v");

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
          data: null,
        },
        { status: 404 }
      );
    }

    const existingMessage = await messageModel.findOne({ _id: messageId });
    if (!existingMessage) {
      return NextResponse.json(
        {
          message: "Message not found",
          success: false,
          data: null,
        },
        { status: 404 }
      );
    }

    await messageModel.deleteOne({ _id: messageId });

    return NextResponse.json(
      {
        message: "Message deleted successfully",
        success: true,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        success: false,
        data: null,
      },
      { status: 500 }
    );
  }
}
