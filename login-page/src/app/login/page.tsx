'use client'
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
const page = () => {
  const [user, setUser] = useState({
    email : "",
    password : ""
  });

  const [buttonDisabled , setButtonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async () => {
    setButtonDisabled(true);
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
      if(response.status === 200) {
        setButtonDisabled(false);
        setLoading(false);
        router.push("/profile");
      }
    } catch (error) {
      setButtonDisabled(false);
      setLoading(false);
      console.log("Error in login:", error);
      toast.error("Something went wrong in login");
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-">
    <h1>{loading ? "Processing..." : "Log in"}</h1>
    <hr />
  

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
     onClick={onLogin}
     >
      {buttonDisabled ? "No Login" : "Login"}
    </button>

   </div>
   </>
  )
}

export default page