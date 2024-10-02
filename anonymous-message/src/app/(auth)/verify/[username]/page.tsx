'use client';

import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Page = () => {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams<{username: string}>();
    const [otp, setOtp] = useState<string>("");

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            verifyCode: "",
        },
    });

    const fetchOtp = async () => {
        try {
            const response = await axios.get<ApiResponse>(`/api/get-otp/${params.username}`);
            if (response.status === 200) {
                setOtp(response.data.data); // Correct the path to setOtp
            }
        } catch (error) {
            console.log(`Error in getting otp of ${params.username}: ${error}`);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error in getting OTP",
                description: axiosError.response?.data.message ?? "Something went wrong while getting OTP",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchOtp();
    }, []);

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: params.username,
                code: data.verifyCode,
            });
            if (response.status === 200) {
                toast({
                    title: "Account verified",
                    description: "Your account has been verified. Please log in.",
                    variant: "default",
                });
                router.push('/sign-in');
            }
        } catch (error) {
            console.log(`Error in verification of ${params.username}: ${error}`);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error in Verification",
                description: axiosError.response?.data.message ?? "Something went wrong while verifying your account",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen">
            <div className="absolute backdrop-blur-sm -z-10"></div> {/* Backdrop effect on all sides */}

            <div className="w-full max-w-md p-8 space-y-4 dark:bg-black/70 border backdrop-blur-sm rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                    {/* Display the OTP correctly */}
                    <p>Your OTP: {otp ? otp : "User already verified "}</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
                        <FormField
                            control={form.control}
                            name="verifyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <InputOTP maxLength={6} {...field} className="flex justify-center space-x-2">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTP>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-4">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Page;
