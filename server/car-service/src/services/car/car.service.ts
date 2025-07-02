import {
  HandleError,
  serviceResponse,
  safeParser,
  ResponseOptions,
} from "@amrogamal/shared-code";
import { Car } from "../../models/mongodb/car/car.model";
import {
  AddCarDto,
  AddCarDtoType,
  CarDto,
  UpdateCarDto,
  UpdateCarDtoType,
} from "../../dtos/car/car.dto";
import { sendCarEvent } from "../../kafka/producers/car.producer";
import { S3Service } from "../s3/s3.service";
const s3Service = S3Service.getInstance();
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
      const createdCar = await Car.create({
        ...data,
        userId,
      });
      await sendCarEvent("car.created", {
        ...createdCar.toObject(),
        id: createdCar._id,
      });
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

  countCar = warpError(async (): Promise<ResponseOptions> => {
    return serviceResponse({
      count: await Car.countDocuments(),
    });
  });

  updateCar = warpError(
    async (
      _id: string,
      files: { [fieldname: string]: Express.MulterS3.File[] },
      data: UpdateCarDtoType,
      keys: string[]
    ): Promise<ResponseOptions> => {
      const prefix = `cars/${keys[0].split("/")[1]}/`;
      const result = safeParser({
        data,
        userDto: UpdateCarDto,
        actionType: "update",
      });
      if (!result.success) return result;

      await s3Service.checkImagesLimit(
        prefix,
        keys.length,
        Number(files["carImages"].length)
      );

      const updatedCar = await s3Service.updateCarInDatabase(_id, result.data);
      if (!updatedCar) {
        return serviceResponse({
          statusText: "Not Found",
          message: "Car not found",
        });
      }

      await Promise.all([
        s3Service.uploadImages(files, prefix, keys),
        sendCarEvent("car.updated", {
          ...updatedCar.toObject(),
          id: _id,
        }),
      ]);

      return serviceResponse({
        updatedCount: 1,
      });
    }
  );

  uploadNewImages = warpError(
    async (
      _id: string,
      files: { [fieldname: string]: Express.MulterS3.File[] }
    ): Promise<ResponseOptions> => {
      const getCar = await Car.findById({ _id });
      if (!getCar) {
        return serviceResponse({
          statusText: "Not Found",
          message: "Car not found",
        });
      }

      await s3Service.checkImagesLimit(
        getCar.prefix,
        0,
        Number(files["carImages"].length)
      );

      const result = await s3Service.uploadImages(files, getCar.prefix);
      getCar.carImages = [...result, ...getCar.carImages];

      await Promise.all([
        getCar.save(),
        sendCarEvent("car.updated", {
          ...getCar,
          id: _id,
        }),
      ]);
      return serviceResponse({
        statusText: "OK",
        message: "Image uploaded successfully",
      });
    }
  );

  deleteImages = warpError(
    async (
      _id: string,
      userId: string,
      keys: string[]
    ): Promise<ResponseOptions> => {
      const car = await Car.findById({ _id, userId });
      if (!car)
        return serviceResponse({
          statusText: "Not Found",
          message: "Car image not found",
        });

      if (keys.length == car.carImages.length)
        return serviceResponse({
          statusText: "Conflict",
          message:
            "You must keep at least one image. Deleting all images is not allowed.",
        });

      car.carImages = car.carImages.filter(
        (image: any) => !keys.includes(image.key)
      );
      await Promise.all([car.save(), s3Service.deleteImages(keys)]);
      return serviceResponse({
        statusText: "OK",
        message: "Image deleted successfully",
      });
    }
  );

  deleteCar = warpError(async (_id: string): Promise<ResponseOptions> => {
    const deletedData = await Car.deleteOne({ _id });
    await sendCarEvent("car.deleted", {
      id: _id,
    });
    return serviceResponse({ deletedCount: deletedData.deletedCount });
  });
}
