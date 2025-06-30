import { kafka } from "../../configs/kafka.config";
const producer = kafka.producer();

type CarEventType = "car.created" | "car.updated" | "car.deleted";
export const sendCarEvent = async (
  eventType: CarEventType,
  payload: any,
) => {
  await producer.connect();
  await producer.send({
    topic: "car-events",
    messages: [
      {
        key: payload._id.toString(),
        value: JSON.stringify({
          data: payload,
          type: eventType,
        }),
      },
    ],
  });
};
