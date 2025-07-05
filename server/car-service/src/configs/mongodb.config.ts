import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '@amrogamal/shared-code';
dotenv.config();

export const mongodbConnect = async () => {
  try {
    await mongoose.connect(String(process.env.MONGODB_URI), {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB!');
    console.log(`MongoDB Connection State:${mongoose.connection.readyState}`);
    const db = mongoose.connection.db;
    return db;
  } catch (error) {
    logger.error(error);
  }
};
