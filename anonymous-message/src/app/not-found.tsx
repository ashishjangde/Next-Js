'use client';

import errorLottie from "@/public/lottie/customError.json";
import Navbar from "@/components/navbar/Navbar";
import { Player } from '@lottiefiles/react-lottie-player';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
        {/* Lottie Animation */}
        <Player
          autoplay
          loop
          src={errorLottie}
          style={{ height: '300px', width: '300px' }}
        />

        {/* Error Message */}
        <h1 className="text-4xl font-bol text-destructive mt-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}
