import { mongodbConnect } from '../src/config/mongodb.config';
import { redis } from '../src/config/redis.config';
import mongoose from "mongoose"

let mongoConnected = false;
let redisConnected = false;

const connectTestServices = async (): Promise<void> => {
  if (!mongoConnected) {
    await mongodbConnect();
    mongoConnected = true;
  }

  if (!redis.isOpen && !redisConnected) {
    await redis.connect();
    redisConnected = true;
  }
};

const disconnectTestServices = async (): Promise<void> => {
  if (redis.isOpen && redisConnected) {
    await redis.quit();
    redisConnected = false;
  }
};

beforeAll(async () => {
  await connectTestServices();
});

afterAll(async () => {
  await disconnectTestServices();
  await mongoose.disconnect();
});
