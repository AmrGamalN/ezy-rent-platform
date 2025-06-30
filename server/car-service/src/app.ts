import express from "express";
import { kafkaLoader } from "./loaders/kafkaLoader";
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from ITEM service");
});

kafkaLoader().catch((err) =>
  console.error("Kafka Consumer failed to start", err)
);

app.listen(PORT, () => {
  console.log(`Item service running on port ${PORT}`);
});
