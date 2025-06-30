import { Request, Response } from "express";
import { controllerResponse } from "@amrogamal/shared-code";
import { CarService } from "../services/car.service";

export class CarController {
  static instance: CarController;
  private carService: CarService;
  private constructor() {
    this.carService = CarService.getInstance();
  }
  public static getInstance(): CarController {
    if (!CarController.instance) {
      this.instance = new CarController();
    }
    return this.instance;
  }

  createMapping = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.elasticMapping();
    return controllerResponse(res, result);
  };

  getCar = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.getCar(req.params.id);
    return controllerResponse(res, result);
  };
}
