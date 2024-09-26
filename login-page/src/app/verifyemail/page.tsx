'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const VerifyEmailPage = () => {
  const [token, setToken] = useState(""); 
  const [verified, setVerified] = useState(false); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const [error, setError] = useState(false);

  const searchParams = useSearchParams(); 

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.status === 200) {
        setVerified(true);
        toast.success("Email verified successfully");
      }
    } catch (error) {
      setError(true);
      toast.error("Please verify your email again to get a valid link");
    }
  };

  useEffect(() => {
    // const urlToken = window.location.search.split("=")[1];
    // setToken(urlToken || "");   // unoptimized code
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken); 
  }, [searchParams]); // Listen for changes in search params

  useEffect(() => {
   
    if (token !== "") {
      setIsButtonDisabled(false);
    }
  }, [token]); // Re-run this effect when the token changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="p-6 rounded-md shadow-md w-full max-w-md text-white text-center">
        <h1 className="text-2xl font-semibold mb-4">Verify Email</h1>
        <p className="mb-4">
          {verified
            ? "Your email has been verified!" 
            : error 
            ? "Invalid or expired link." 
            : "Click the button below to verify your email."}
        </p>
        <button
          onClick={verifyEmail}
          disabled={isButtonDisabled}
          className={`w-full p-3 rounded-md font-semibold bg-black border-2 border-gray-600 transition ${
            isButtonDisabled ? 'cursor-not-allowed' : 'hover:border-gray-400'
          }`}
        >
          {isButtonDisabled ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
