import { Request, Response } from 'express';
import { SecurityService } from '../../services/auth/security.service';
import { controllerResponse } from '@amrogamal/shared-code';

export class SecurityController {
  static instance: SecurityController;
  private securityService: SecurityService;

  constructor() {
    this.securityService = SecurityService.getInstance();
  }

  static getInstance(): SecurityController {
    if (!SecurityController.instance) {
      SecurityController.instance = new SecurityController();
    }
    return SecurityController.instance;
  }

  generate2FA = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.securityService.generate2FA(
      req?.curUser?.email as string,
    );
    return controllerResponse(res, result);
  };

  verify2FA = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.securityService.verify2FA(
      req?.curUser?.email as string,
      req.body.otp,
    );
    return controllerResponse(res, result);
  };

  sendResetpasswordLink = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const result = await this.securityService.sendResetpasswordLink(
      req.body.email,
    );
    return controllerResponse(res, result);
  };

  updatePassword = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.securityService.updatePassword(
      String(req.email),
      req.body.password,
    );
    return controllerResponse(res, result);
  };
}
