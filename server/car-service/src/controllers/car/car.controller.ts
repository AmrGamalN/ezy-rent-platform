import { Request, Response } from "express";
import { controllerResponse } from "@amrogamal/shared-code";
import { CarService } from "../../services/car/car.service";

export class CarController {
  static instance: CarController;
  private carService: CarService;

  constructor() {
    this.carService = CarService.getInstance();
  }

  static getInstance(): CarController {
    if (!CarController.instance) {
      CarController.instance = new CarController();
    }
    return CarController.instance;
  }

  createCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.createCar(
      req.body,
      String(req.curUser?.userId)
    );
    return controllerResponse(res, result);
  };

  getCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.getCar(req.params.id);
    return controllerResponse(res, result);
  };

  countCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.countCar();
    return controllerResponse(res, result);
  };

  updateCar = async (req: Request, res: Response): Promise<Response> => {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };
    const result = await this.carService.updateCar(
      req.params.id,
      files,
      req.body,
      req.body.keys
    );
    return controllerResponse(res, result);
  };

  uploadNewImages = async (req: Request, res: Response): Promise<Response> => {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };
    const result = await this.carService.uploadNewImages(req.params.id, files);
    return controllerResponse(res, result);
  };

  deleteImages = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.deleteImages(
      req.params.id,
      String(req.curUser?.userId),
      req.body.keys
    );
    return controllerResponse(res, result);
  };

  deleteCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.deleteCar(req.params.id);
    return controllerResponse(res, result);
  };
}
