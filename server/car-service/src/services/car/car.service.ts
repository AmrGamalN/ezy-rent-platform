import {
  HandleError,
  serviceResponse,
  safeParser,
  ResponseOptions,
} from "common";
import { Car } from "../../models/mongodb/car/car.model";
import {
  AddCarDto,
  AddCarDtoType,
  CarDto,
  UpdateCarDto,
  UpdateCarDtoType,
} from "../../dtos/car/car.dto";
import { sendCarEvent } from "../../kafka/producers/car.producer";
const { warpError } = HandleError.getInstance();

export class CarService {
  private static instance: CarService;
  private constructor() {}

  public static getInstance() {
    if (!CarService.instance) {
      this.instance = new CarService();
    }
    return this.instance;
  }

  createCar = warpError(
    async (data: AddCarDtoType, userId: string): Promise<ResponseOptions> => {
      const error = safeParser({
        data,
        userDto: AddCarDto,
      });
      if (!error.success) return error;
      const createdCar = await Car.create({ ...data, userId });
      await sendCarEvent("car.created", { ...createdCar, userId });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getCar = warpError(async (_id: string): Promise<ResponseOptions> => {
    return safeParser({
      data: await Car.findById({ _id }),
      userDto: CarDto,
    });
  });

  countCar = warpError(
    async (queries: any, filtered?: boolean): Promise<ResponseOptions> => {
      return serviceResponse({
        count: await Car.countDocuments(),
      });
    }
  );

  updateCar = warpError(
    async (_id: string, data: UpdateCarDtoType): Promise<ResponseOptions> => {
      const result = safeParser({
        data,
        userDto: UpdateCarDto,
        actionType: "update",
      });
      if (!result.success) return result;
      const updatedData = await Car.updateOne({ _id }, { $set: result.data });
      await sendCarEvent("car.updated", {
        _id,
        ...updatedData,
      });
      return serviceResponse({
        updatedCount: updatedData.modifiedCount,
      });
    }
  );

  deleteCar = warpError(async (_id: string): Promise<ResponseOptions> => {
    const deletedData = await Car.deleteOne({ _id });
    await sendCarEvent("car.deleted", {
      _id,
    });
    return serviceResponse({ deletedCount: deletedData.deletedCount });
  });
}
