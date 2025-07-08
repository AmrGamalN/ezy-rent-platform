import { kafka } from '../../configs/kafka.config';
import { ICar } from '../../types/car.type';
const producer = kafka.producer();
const connectProducer = producer.connect();

type CarEventType = 'car.created' | 'car.updated' | 'car.deleted';
export const sendCarEvent = async <T extends ICar | { _id: string }>(
  eventType: CarEventType,
  payload: T,
): Promise<void> => {
  await connectProducer;
  await producer.send({
    topic: 'car-events',
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
