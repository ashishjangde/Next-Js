import { IMessage } from "@/models/message.model";

export default interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: IMessage[];

}