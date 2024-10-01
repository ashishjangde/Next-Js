'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <div className="my-20 mx-4 md:mx-8 lg:mx-auto p-6 rounded-lg  max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Welcome, Anonymous User</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Paste your unique link here to send a message to your friend:
        </h2>
        <div className="flex items-center max-w-7xl rounded-md shadow-md mt-8 ">
          <Input
            type="link"
            placeholder="Paste Your Unique Link Here..."
            disableFocus
            className="input-underground"
          />
          <Button className="ml-2 text-white">
            Send
          </Button>
        </div>
      </div>
      <Separator className="my-4" />


      
      <div className="text-center">
        <p className="text-lg text-gray-500">
          Enjoy connecting with your friends anonymously and securely!
        </p>
      </div>
    </div>
  );
}
