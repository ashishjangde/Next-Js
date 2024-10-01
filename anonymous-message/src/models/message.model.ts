import mongoose, { Schema ,Document , model ,Types } from "mongoose";

export interface IMessage extends Document {
    _id: Types.ObjectId | string,
    content : string,
    createdAt: Date,
}


const messageSchema : Schema<IMessage> = new Schema({
    content : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})

const messageModel = mongoose.models.messages as mongoose.Model<IMessage> || model<IMessage>("messages" , messageSchema);

export default messageModel;