import { connectDB } from "@/db/dbConfig";
import { Users } from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connectDB();
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, email, password } = body; 
    
        const user = await Users.findOne({ email });      
    
        if (user) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 409 });
        }   

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new Users({ 
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        try {
            // Attempt to send email
            await sendEmail({ email, emailType: "verify", userId: savedUser._id });
        } catch (emailError) {
            console.error("Error in sending email:", emailError);
            return NextResponse.json({ message: "User created, but failed to send verification email" }, { status: 500 });
        }

        const existingUser = await Users.findOne({ email }).select("-password -forgotPasswordToken -forgotPasswordExpiry -verifyToken -verifyTokenExpiry");
        return NextResponse.json({
            existingUser,
            message: "User Created Successfully",
            success: true 
        }, { status: 201 });

    } catch (error) {
        console.error("Error in user creation:", error);
        return NextResponse.json({ message: "Something went wrong in creating the user" }, { status: 500 });
    }
}
