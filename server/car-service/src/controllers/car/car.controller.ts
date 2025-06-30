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
    // const result = await this.carService.createCar(req.body, req.curUser._id);
    const result = await this.carService.createCar(req.body);
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
    const result = await this.carService.updateCar(req.params.id, req.body);
    return controllerResponse(res, result);
  };

  deleteCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.deleteCar(req.params.id);
    return controllerResponse(res, result);
  };
}
