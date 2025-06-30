import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

export const kafka = new Kafka({
  clientId: "car-service",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

