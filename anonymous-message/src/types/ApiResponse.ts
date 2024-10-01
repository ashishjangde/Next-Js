import { IMessage } from "@/models/message.model";

export interface ApiResponse {
    success: boolean;
    message: string;
    data: any
    isAcceptingMessages?: boolean;
  };