'use client'
import {  useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {

  const [user , setUser] = useState({
    username : "",
    email : "",
    password : ""
  })

  const router = useRouter();

  const [buttonDisabled , setButtonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
     const response =  await axios.post("/api/users/signup" , user);
     console.log("response:", response.data);
     
     if(response.status === 201){
      toast.success("User created successfully");
      router.push("/login");
     }
    } catch (error) {
      console.log("Error in signup:", error);
      toast.error("Something went wrong in signup");
    }
  }

  useEffect(() => {
    if(user.username.length > 0  && user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    } 
  }, [user])
  
  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen py-">
    <h1>{loading ? "Processing..." : "Sign Up"}</h1>
    <hr />
    
    <label htmlFor="username">Username</label>
    <input
    id="username"
    value={user.username}
    onChange={(e) => setUser({...user , username : e.target.value})} 
    placeholder="Enter your username"
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    />

    <label htmlFor="email">Email</label>
    <input
    id="email"
    value={user.email}
    onChange={(e) => setUser({...user , email : e.target.value})} 
    placeholder="Enter your email"
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    />

    <label htmlFor="password">Password</label>
    <input
    id="password"
    value={user.password}
    onChange={(e) => setUser({...user , password : e.target.value})} 
    placeholder="Enter your password"
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    />

    <button
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
     disabled={buttonDisabled}
     onClick={onSignup}
     >
      {buttonDisabled ? "No Signup" : "Sign Up"}
    </button>

   </div>
   </>
  )
}

export default page