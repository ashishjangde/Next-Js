import messageModel from "@/models/message.model";
import userModel from "@/models/user.model";
import connectDB from "@/lib/dbConfig";
import { Schema } from "mongoose";



export async function POST(request: Request) {
    await connectDB();
    try {
        const { username , content } = await request.json();
        const user = await userModel.findOne({ username });
        if (!user) {
            return Response.json({ message: "User not found", success: false }, { status: 404 });
        }
        if(!user.isAcceptingMessages){
            return Response.json({ message: "User is not accepting messages", success: false }, { status: 400 });
        }

        const message = await messageModel.create({ 
            content,
            createdAt: new Date()
        });

        user.messages.push(message._id as Schema.Types.ObjectId);
        await user.save();
        return Response.json({ message: "Message sent successfully", success: true, data: message }, { status: 200 });

    } catch (error) {
         return Response.json(
            {
                message: "Something went wrong in Sending Message",
                success: false,
                data: null
            },
            {
                status: 500
            }
        );
    }
   
}