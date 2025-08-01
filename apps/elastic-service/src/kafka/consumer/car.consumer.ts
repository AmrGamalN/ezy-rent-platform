import { kafka } from '../../config/kafka.config';
import { CarService } from '../../service/car.service';
import { HandleError, logger } from '@amrogamal/shared-code';
const { warpError } = HandleError.getInstance();

export class CarConsumer {
  private static instance: CarConsumer;
  private carService: CarService;
  private constructor() {
    this.carService = CarService.getInstance();
  }

  public static getInstance(): CarConsumer {
    if (!CarConsumer.instance) {
      this.instance = new CarConsumer();
    }
    return this.instance;
  }

  startCarConsumer = warpError(async (): Promise<void> => {
    const consumer = kafka.consumer({ groupId: 'car-group' });
    await consumer.connect();
    await consumer.subscribe({
      topic: 'car-events',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          if (!message.value) return;
          const { data, type } = JSON.parse(message.value.toString());
          const id = data?.id;
          if (type === 'car.created') {
            await this.carService.create({ data, index: 'cars', id });
          } else if (type === 'car.updated') {
            await this.carService.update({ data, index: 'cars', id });
          } else if (type === 'car.deleted') {
            await this.carService.delete({ index: 'cars', id });
          }
        } catch (error) {
          logger.error(error);
        }
      },
    });
  });
}
