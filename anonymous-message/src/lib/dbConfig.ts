import mongoose from "mongoose";

interface ConnectionType {
  isConnected?: number; // 1 means connected, 0 means disconnected
}

const connection: ConnectionType = {};

const connectDB = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL! || "" );

    connection.isConnected = db.connection.readyState;

    console.log("MongoDB Connected Successfully");

    db.connection.on("connected", () => {
      console.log("MongoDB connection established");
    });

    db.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      connection.isConnected = 0; 
    });

    db.connection.on("error", (error) => {
      console.error("MongoDB Connection Error: ", error);
      throw error;
    });

  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;
