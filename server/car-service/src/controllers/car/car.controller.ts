import { Request, Response } from 'express';
import { controllerResponse } from '@amrogamal/shared-code';
import { CarService } from '../../services/car/car.service';

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

  create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.carService.create(
      req.body,
      String(req.curUser?.userId),
    );
    return controllerResponse(res, response);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.carService.get(req.params.id);
    return controllerResponse(res, response);
  };

  count = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.carService.count();
    return controllerResponse(res, response);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };
    const response = await this.carService.update(
      req.params.id,
      files,
      req.body,
      req.body.keys,
    );
    return controllerResponse(res, response);
  };

  uploadNewImages = async (req: Request, res: Response): Promise<Response> => {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };
    const response = await this.carService.uploadNewImages(
      req.params.id,
      files,
    );
    return controllerResponse(res, response);
  };

  deleteImages = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.carService.deleteImages(
      req.params.id,
      String(req.curUser?.userId),
      req.body.keys,
    );
    return controllerResponse(res, response);
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.carService.delete(req.params.id);
    return controllerResponse(res, response);
  };
}
