import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (reqest: NextRequest) => {
 try {
   const token = reqest.cookies.get("token")?.value || " ";  
   const decodedToken : any =  jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
   return decodedToken._id;

 } catch (error : any) {
    throw Error (error.message);
 }   

}