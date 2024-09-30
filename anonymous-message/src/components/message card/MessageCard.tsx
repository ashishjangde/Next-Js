'use client'

import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

import {IMessage} from '@/models/message.model'

import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import ApiResponse from "@/types/ApiResponse"

interface MessageCardProps {
    message:IMessage
    deleteMessage: (messageId: string) => void
}

const MessageCard = ({ message, deleteMessage }: MessageCardProps) => {

    const {toast} = useToast();

    const handelDeleteMessage = async () => {
     const response = await  axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)

     if (response.status == 200) {
        toast({
            title: "Message Deleted",
        })
     }
    deleteMessage(message._id)
    }
return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><X/></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handelDeleteMessage}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
        </Card>

    )
}

export default MessageCard