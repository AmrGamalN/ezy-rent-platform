import { CarConsumer } from "./kafka/car.consumer";

export const kafkaStart = async () => {
  const carConsumer = CarConsumer.getInstance();
  await carConsumer.startCarConsumer();
};
