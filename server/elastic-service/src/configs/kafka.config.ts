import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "car-service",
  brokers: [String(process.env.KAFKA_URL)],
});

export const kafkaConfig = () => {
  console.log("Kafka client initialized");
  return kafka;
};
