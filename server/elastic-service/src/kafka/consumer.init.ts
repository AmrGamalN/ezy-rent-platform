import { CarConsumer } from "./consumer/car.consumer";

export const kafkaStart = async () => {
  const carConsumer = CarConsumer.getInstance();
  await carConsumer.startCarConsumer();
};
