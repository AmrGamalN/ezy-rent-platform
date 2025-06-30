import { kafka } from "../../configs/kafka.config";
import { ElasticService } from "../../services/car/elastic.service";
import { HandleError } from "common";
const { warpError } = HandleError.getInstance();

export class CarConsumer {
  private static instance: CarConsumer;
  private elasticService: ElasticService;
  private constructor() {
    this.elasticService = ElasticService.getInstance();
  }

  public static getInstance(): CarConsumer {
    if (!CarConsumer.instance) {
      this.instance = new CarConsumer();
    }
    return this.instance;
  }

  startCarConsumer = warpError(async (): Promise<void> => {
    const consumer = kafka.consumer({ groupId: "car-group" });
    await consumer.connect();

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        console.log("topic", topic);
        console.log("partition", partition);
        console.log("message", message);
        console.log("heartbeat", heartbeat);

        if (message.value === null) return;

        const { data, type } = JSON.parse(message.value.toString());
        if (type === "car.created") {
          console.log(`[Kafka] Received event: ${type} - ID: ${data._id}`);
          await this.elasticService.createCar({
            data,
            index: "cars",
            id: data._id,
          });
        } else if (type === "car.updated") {
          console.log(`[Kafka] Received event: ${type} - ID: ${data._id}`);
          await this.elasticService.updateCar({
            data,
            index: "cars",
            id: data._id,
          });
        } else if (type === "car.deleted") {
          console.log(`[Kafka] Received event: ${type} - ID: ${data._id}`);
          await this.elasticService.deleteCar({
            index: "cars",
            id: data._id,
          });
        }
      },
    });
  });
}
