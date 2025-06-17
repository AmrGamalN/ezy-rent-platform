import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

export const kafka = new Kafka({
  clientId: "item-service",
  brokers: [String(process.env.KAFKA_URL)],
});

