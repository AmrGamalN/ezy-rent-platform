import { Request, Response } from 'express';
import { RegisterService } from '../../service/auth/register.service';
import { AuthRegisterService } from '../../service/auth/auth.register.service';
import { controllerResponse } from '@amrogamal/shared-code';
import {
  FirebaseOAuthUser,
  FirebasePhoneUser,
} from '../../types/firebase.type';
export class RegisterController {
  static instance: RegisterController;
  private registerService: RegisterService;
  private authRegisterService = AuthRegisterService.getInstance();
  constructor() {
    this.registerService = RegisterService.getInstance();
    this.authRegisterService = AuthRegisterService.getInstance();
  }

  static getInstance(): RegisterController {
    if (!RegisterController.instance) {
      RegisterController.instance = new RegisterController();
    }
    return RegisterController.instance;
  }

  registerEmail = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.registerService.registerEmail(
      req.body,
      req.file as Express.Multer.File,
    );
    return controllerResponse(res, result);
  };

  registerFacebook = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.registerService.registerFacebook(
      req.decode as FirebaseOAuthUser,
    );
    return controllerResponse(res, result);
  };

  registerGoogle = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.registerService.registerGoogle(
      req.decode as FirebaseOAuthUser,
    );
    return controllerResponse(res, result);
  };

  verifyEmail = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const result = await this.registerService.verifyEmail(req.params.token);
    if (result.success) {
      return res.redirect(
        'http://localhost:5173/confirm-status?status=success&message=Email%20verified%20success',
      );
    }
    return res.redirect(
      `http://localhost:5173/confirm-status?status=failed&message=Verification%20link%20${result.key}`,
    );
  };

  resendEmail = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.authRegisterService.resendEmail(req.body.email);
    return controllerResponse(res, result);
  };

  registerPhone = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.registerService.registerPhone(req.body);
    return controllerResponse(res, result);
  };

  verifyPhone = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.registerService.verifyPhone(
      req.decode as FirebasePhoneUser,
    );
    return controllerResponse(res, result);
  };
}
