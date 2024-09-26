import { connectDB } from "@/db/dbConfig";
import { Users } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
connectDB();


export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, password } = req;
        const user = await Users.findOne({ email }).select("-password -forgotPasswordToken -forgotPasswordExpiry -verifyToken -verifyTokenExpiry");
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 });

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) return NextResponse.json({ message: "Password is incorrect" }, { status: 400 });
        if (!user.isVerified) return NextResponse.json({ message: "User not verified" }, { status: 400 });

        const token = await jwt.sign(
            {
                id: user._id, username: user.username, email: user.email
            },
                process.env.JWT_TOKEN_SECRET!,
            {
                expiresIn: "30d"
            });

        const response = NextResponse.json({ user, message: "User logged in successfully" }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });
        return response;

    } catch (error) {
        console.error("Error in user creation:", error);
        return NextResponse.json({ message: "Something went wrong in Login the user" }, { status: 500 });
    }

}