import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully 🔥");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw new Error(error);
  }
}