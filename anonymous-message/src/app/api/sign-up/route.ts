import connectDB from "@/lib/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationEmail";
import { NextRequest } from "next/server";
import { console } from "inspector";
import z from 'zod'
import { signupSchema } from "@/schemas/signUpSchema";


const signUpQuerySchema = z.object({
    username:signupSchema.shape.username,
    email:signupSchema.shape.email,
    password:signupSchema.shape.password
});

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { email, username, password } = await request.json();

        // validate with zod
        const result = signUpQuerySchema.safeParse({ email, username, password });
        if (!result.success) {
            const errorMessages = result.error.errors.map((err) => 
                `${err.path.join('.')} : { ${err.message} }` 
            );
            return Response.json(
                
                {
                    message: errorMessages,
                    success: false,
                    data: null
                    
                },
                {
                    status: 400
                });
        }
       const existingUserVerifiedByUsername = await User.findOne(
        { 
        username ,
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
                    status: 201
                });
        }
        if(!emailResponse.success) {
            return Response.json(
                {
                    message: "Something went wrong in sending verification email",
                    success: false,
                    data: null
                },
                {
                    status: 500
                });
        }

    } catch (error : any) {
        console.log(error);
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