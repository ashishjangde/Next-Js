
import { connectDB } from "@/db/dbConfig";
import { Users } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, username } = req;

        const userExists = await Users.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 409 });
        }

        return NextResponse.json({ message: "User is available" }, { status: 200 });
    } catch (error) {
        console.error("Error checking user existence:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
