import { CarConsumer } from "../kafka/consumers/car.consumer";

export const kafkaLoader = async () => {
  const carConsumer = CarConsumer.getInstance();
  await carConsumer.startCarConsumer();
};
