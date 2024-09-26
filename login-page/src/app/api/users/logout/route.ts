import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
    try {
        const response  = NextResponse.json({ message: "User logged out successfully" , success : true }, { status: 200 });
        response.cookies.set("token" , "", {
            httpOnly: true,
            path: "/",
        });

        return response;

    } catch (error) {   
        console.error("Error in user logout:", error);
        return NextResponse.json({ message: "Something went wrong in logging out the user" }, { status: 500 });
    }
}