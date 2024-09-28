import connectDB from "@/lib/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationEmail";
import { NextRequest } from "next/server";
import { console } from "inspector";


export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { email, username, password } = await request.json();

        console.log(email, username, password);
        //existing user check
       const existingUserVerifiedByUsername = await User.findOne(
        { 
        username,
        isVerified: true 
        })

        if(existingUserVerifiedByUsername) {
            return Response.json(
                {
                    message: "User with this Username already exists",
                    success: false,
                    data: null
                },
                {
                    status: 400
                });
        }

        
        const existingUserByEmail = await User.findOne({email});
        
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        message: "User with this Email already exists",
                        success: false,
                        data: null
                    },
                    {
                        status: 400
                    });
            }else {
                const hashedPassword = await bcryptjs.hash(password, 10);
                const verifyCodeExpiry = new Date();
                verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
                await existingUserByEmail.save();
            }
           
        }else{

            const hashedPassword = await bcryptjs.hash(password, 10);
           const verifyCodeExpiry = new Date();
           verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

           const user =  new User({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: verifyCodeExpiry, 
            isVerified: false,
            isAcceptingMessages: true,
            messages: [],
           })
           await user.save();
        }

        const existingUser = await User.findOne({ email }).select("-password -verifyCode -verifyCodeExpiry -__v");


       const emailResponse = await sendVerificationEmail({
            email,
            username,
            verificationCode: verifyCode
        });

        if(emailResponse.success) {
            return Response.json(
                {
                    message: "Sign up successful",
                    success: true,
                    data: existingUser
                },
                {
                    status: 200
                });
        }else {
            return Response.json(
                {
                    message: emailResponse.message,
                    success: false,
                    data: null
                },
                {
                    status: 500
                });
        }

    } catch (error : any) {
        return Response.json(
            {
                message: "Something went wrong in signing up",
                success: false,
                data: null
            },
            {
                status: 500
            });
    }
}