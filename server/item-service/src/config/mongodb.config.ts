import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoConfig = () => {
  mongoose
    .connect(String(process.env.MONGODB_URI))
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};