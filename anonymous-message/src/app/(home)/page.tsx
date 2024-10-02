'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRouteSchema } from "@/schemas/forwardRouteSchema";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
export default function Home() {

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof forwardRouteSchema>>({
    resolver: zodResolver(forwardRouteSchema),
    defaultValues: {
      route: '',
    }
  });

  const handleRouteSubmit = (data: z.infer<typeof forwardRouteSchema>) => {
     router.push(data.route);

    toast({
      title: "Success",
      description: "Your link has been forwarded",
      variant: "default", 
    });
  };

  return (
    <div className="my-20 mx-4 md:mx-8 lg:mx-auto p-6 rounded-lg max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome, Anonymous User</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-2 text-center">
          Paste your unique link here to send a message to your friend:
        </h2>
        <div className="flex flex-col items-center w-full mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRouteSubmit)} className="flex flex-col items-center w-full">
              <FormField 
                control={form.control}
                name="route"
                render={({ field }) => (
                  <FormItem className="w-full"> {/* Ensure input takes full width */}
                    <Input
                      type="text"
                      placeholder="Enter your unique link"
                      disableFocus
                      className="w-full input-underground" // Ensure the input takes full width
                      {...field}
                    />
                    <FormMessage /> {/* Style the error message */}
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                variant={"custom"}
                className="mt-4 w-full lg:w-2/4 md:w-3/4 rounded-full dark:bg-white dark:text-black bg-gray-950 " // Full width on small devices, 1/4 width on large devices
              >
               Redirect
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg text-gray-500">
          Enjoy connecting with your friends anonymously and securely!
        </p>
      </div>

      <Separator className="my-6" />
    </div>
  );
}
