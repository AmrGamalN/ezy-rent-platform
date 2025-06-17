import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({
  url: String(process.env.REDIS_URL),
});