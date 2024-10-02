import userModel from "@/models/user.model";
import connectDB from "@/lib/dbConfig";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
   await connectDB();
   try {
    const { username } = params;
    const user = await userModel.findOne({ username });
    
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const verifyCode = user.verifyCode;

    return NextResponse.json({ data: verifyCode, success: true }, { status: 200 });
    
   } catch (error) {
    return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
   }
}
