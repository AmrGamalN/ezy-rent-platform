import { kafka } from '../../configs/kafka.config';
const producer = kafka.producer();
const connectProducer = producer.connect();

type CarEventType = 'car.created' | 'car.updated' | 'car.deleted';
export const sendCarEvent = async (eventType: CarEventType, payload: any) => {
  const { _id, __v, ...rest } = payload;
  await connectProducer;
  await producer.send({
    topic: 'car-events',
    messages: [
      {
        key: rest.id.toString(),
        value: JSON.stringify({
          data: rest,
          type: eventType,
        }),
      },
    ],
  });
};
