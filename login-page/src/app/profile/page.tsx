'use client'

import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";



const page = () => {
    const router = useRouter();
    const [data, setData] = useState<any>('nothing');
    const [loading, setLoading] = useState(false);
    const onLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            if (response.status === 200) {
                toast.success("Logout successful");
                router.push("/login");
            }
        } catch (error) {
            console.log("Error in logout:", error);
            toast.error("Something went wrong in logout");
        }
    };

    const seeProfile = async () => {
        try {
            const response = await axios.get("/api/users/me");
            if (response.status === 200) {
                console.log('response:', response.data.user);
                setData(response.data.user);
            }
        } catch (error) {
            console.log('eror in fetching profile:', error);
            toast.error("Something went wrong in fetching profile");
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data._id}`}>{data._id}
            </Link>}</h2>
            <hr />
            <button
                onClick={onLogout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={seeProfile}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>


        </div>
    )
}

export default page