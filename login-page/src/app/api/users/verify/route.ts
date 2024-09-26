import { connectDB } from "@/db/dbConfig";
import { Users } from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";
connectDB();


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const{token} = body;
      const user = await Users.findOne({verifyToken: token , verifyTokenExpiry: {$gt: Date.now()}});

      if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();

      const verifiedUser = await Users.findOne({_id: user._id})
      .select("-password -forgotPasswordToken -forgotPasswordExpiry -verifyToken -verifyTokenExpiry");

      return NextResponse.json({verifiedUser , message: "User verified successfully" }, { status: 200 });
    } catch (error : any) {
        console.error("Error in user Verifiacation:", error);
        return NextResponse.json({ message: "Something went wrong in verifying  the user" }, { status: 500 });
    }
}