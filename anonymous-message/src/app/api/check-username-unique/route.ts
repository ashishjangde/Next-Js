import connectDB from "@/lib/dbConfig";
import z from 'zod'
import userModel from "@/models/user.model";
import { usernameValidationSchema } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidationSchema
})

export async function GET (request: Request){
    await connectDB();
    try {
        const { searchParams } = new URL(request.url);
        const queryparams = {
            username: searchParams.get('username')
        }
        // validate with zod
        const result = usernameQuerySchema.safeParse(queryparams);
        console.log(result); // todo remove console log
        if (!result.success) {
            return Response.json({ message: result.error.format().username?._errors[0] , success: false }, { status: 400 });
        }
        const { username } = result.data;
        const existingVerifiedUser = await userModel.findOne({ username , isVerified: true });

        
        if (existingVerifiedUser) {
            return Response.json({ message: "Username already exists" , success: false }, { status: 400 });
        }

        if(!existingVerifiedUser) {
            return Response.json({ message: "Username Available" , success: true }, { status: 200 });
        }

    } catch (error) {
        console.log(`Error in check-username-unique: ${error}`);
        return Response.json({ message: "Something went wrong In Checking Username Unique" , success: false }, { status: 500 });
    }
}