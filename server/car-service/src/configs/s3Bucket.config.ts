import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } = process.env;

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: String(AWS_ACCESS_KEY),
    secretAccessKey: String(AWS_SECRET_KEY),
  },
});
