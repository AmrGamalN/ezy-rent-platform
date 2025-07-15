import { CarConsumer } from './consumer/car.consumer';
export const kafkaStart = async (): Promise<void> => {
  const carConsumer = CarConsumer.getInstance();
  await carConsumer.startCarConsumer();
};
