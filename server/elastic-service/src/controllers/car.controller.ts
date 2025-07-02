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
    const result = await this.carService.createMapping();
    return controllerResponse(res, result);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.carService.get(req.params.id);
    return controllerResponse(res, result);
  };

  searchCar = async (req: Request, res: Response): Promise<Response> => {
    const { page, limit, ...query } = req.query;
    const result = await this.carService.searchCar(
      query as any,
      Number(page),
      Number(limit)
    );
    return controllerResponse(res, result);
  };
}
