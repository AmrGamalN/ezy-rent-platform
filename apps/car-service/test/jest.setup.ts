/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express from 'express';
import dotenv from 'dotenv';
import { mongodbConnect } from '../src/config/mongodb.config';
import mongoose from 'mongoose';
dotenv.config();

beforeAll(async () => {
  await mongodbConnect();
});

beforeAll((done) => {
  jest.restoreAllMocks();
  globalThis.app = express();
  globalThis.app.use(express.json());
  globalThis.server = globalThis.app.listen(0, done);
});

jest.mock('../src/config/s3Bucket.config', () => ({
  s3Client: { send: jest.fn() },
}));

jest.mock('../src/config/kafka.config', () => ({
  kafka: {
    producer: () => ({
      connect: jest.fn(),
      send: jest.fn(),
      disconnect: jest.fn(),
    }),
    consumer: () => ({
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn(),
      disconnect: jest.fn(),
    }),
  },
}));

afterAll((done) => {
  jest.clearAllMocks();
  globalThis.server.close(done);
});

afterAll(async () => {
  jest.clearAllMocks();
  await mongoose.disconnect();
});
