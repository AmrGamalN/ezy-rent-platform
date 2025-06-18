import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

export const kafka = new Kafka({
  clientId: "car-service",
  brokers: [String(process.env.KAFKA_URL)],
});

