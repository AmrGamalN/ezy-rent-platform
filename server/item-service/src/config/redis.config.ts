import { createClient } from "redis";

export const redis = () => {
  const redis = createClient({
    url: "redis://redis:6379",
  });
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
  redis.connect();
};