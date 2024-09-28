import { auth } from "@/auth"
import connectDB from "@/lib/dbConfig"
import userModel from "@/models/user.model";
import { User } from "next-auth";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import mongoose from "mongoose";

async function GET(request: Request) {

    await connectDB();
    const session = await auth()
    if (!session) {
        return Response.json(
            {
                message: "Not authenticated",
                success: false,
                data: null
            },
            {
                status: 401
            }
        );
    }

    const user: User = session.user
    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await userModel.aggregate([
            {
              $match: { _id: userId }
            },
            {
              // Lookup to fetch the actual messages data
              $lookup: {
                from: "messages", // The name of the messages collection
                localField: "messages",
                foreignField: "_id",
                as: "messagesData"
              }
            },
            {
              $unwind: "$messagesData" // Unwind the messagesData array
            },
            {
              $sort: { "messagesData.createdAt": -1 } // Sort by createdAt in descending order
            },
            {
              $group: {
                _id: "$_id",
                messages: { $push: "$messagesData" } // Group messages into an array again
              }
            }
          ]);

          if(!user || user.length === 0) {
              return Response.json(
                  {
                      message: "User not found",
                      success: false,
                      data: null
                  },
                  {
                      status: 404
                  }
              );
          }

          return Response.json(
              {
                  message: "User found",
                  success: true,
                  data: user[0].messages
              },
              {
                  status: 200
              }
          );
    } catch (error) {
        return Response.json(
            {
                message: "Something went wrong in Accepting the messages POST",
                success: false,
                data: null
            },
            {
                status: 500
            }
        );
    }
}