import mongoose from "mongoose";

export async function connectDB() {
   try {
       await mongoose.connect(process.env.MONGO_URL!);
       const connection = mongoose.connection;
       connection.on("connected", () => {
           console.log("MongoDB Connected Successfully");
       })
       connection.on("error", (error) => {
           console.log(`MongoDB Connection Error ${error}`);
           process.exit(1);
       })
   } catch (error) {
     console.log(`Something Went Wrong In DB Connection ${error}`);
     
   }
}