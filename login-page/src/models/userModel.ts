import { Schema, model , Document, models} from "mongoose";

interface UserTypes extends Document{
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordExpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;
}

const userSchema  = new Schema<UserTypes>({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
},{timestamps: true});

export const  Users = models.users||model("users", userSchema);