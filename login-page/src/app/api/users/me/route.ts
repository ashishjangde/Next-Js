import { connectDB } from "@/db/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { Users } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
    try {
       const userId = await getDataFromToken(request);

        const user = await Users.findOne({ _id: userId }).select("-password -forgotPasswordToken -forgotPasswordExpiry -verifyToken -verifyTokenExpiry");
        if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ user, message: "User fetched successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in user logout:", error);
        return NextResponse.json({ message: "Something went wrong in fetching the user" }, { status: 500 });
    }
}