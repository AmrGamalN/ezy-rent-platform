import { Request, Response } from 'express';
import { LoginEmailService } from '../../service/auth/login.service';
import { controllerResponse, ResponseOptions } from '@amrogamal/shared-code';
import { Security } from '../../model/mongodb/user/security.model';
import { LoginEmailDtoType, LoginPhoneDtoType } from '../../dto/auth/login.dto';
import { FirebaseOAuthUser } from '../../types/firebase.type';
import config from '../../config/env.config';

export class LoginController {
  static instance: LoginController;
  private loginService: LoginEmailService;

  constructor() {
    this.loginService = LoginEmailService.getInstance();
  }

  static getInstance(): LoginController {
    if (!LoginController.instance) {
      LoginController.instance = new LoginController();
    }
    return LoginController.instance;
  }

  private loginProvider = async <T>(
    res: Response,
    body: T,
    loginProvider: (body: T) => Promise<ResponseOptions>,
  ): Promise<Response> => {
    const result = await loginProvider(body);
    if (!result.success) return res.status(result.status!).json(result);
    const { data, ...responseData } = result;
    if (data.tempToken) {
      this.generateCookies(res, data.tempToken);
      return res.status(result.status!).json(responseData);
    }
    this.generateCookies(res, {
      SID: data,
    });
    return controllerResponse(res, {
      ...responseData,
    });
  };

  loginEmail = async (req: Request, res: Response): Promise<Response> => {
    return await this.loginProvider<LoginEmailDtoType>(
      res,
      req.body,
      this.loginService.loginEmail,
    );
  };

  loginPhone = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider<LoginPhoneDtoType>(
      res,
      req.body,
      this.loginService.loginPhone,
    );
  };

  loginFacebook = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(
      res,
      req.decode as FirebaseOAuthUser,
      this.loginService.loginFacebook,
    );
  };

  loginGoogle = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(
      res,
      req?.decode as FirebaseOAuthUser,
      this.loginService.loginGoogle,
    );
  };

  login2FA = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.loginService.login2FA(
      String(req?.email),
      req.body.otp,
    );
    const { data, ...responseData } = result;
    if (!result.success) return res.status(result.status!).json(result);
    this.generateCookies(res, { accessToken: data.accessToken });
    res.clearCookie('tempToken');
    return controllerResponse(res, {
      ...responseData,
      accessToken: data.accessToken,
    });
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    const userId = String(req?.curUser?.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    await Security.updateOne({ userId }, { $set: { status: 'offline' } });
    return res.status(200).json({
      message: 'Logged out successfully',
    });
  };

  getMe = async (req: Request, res: Response): Promise<Response> => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) return res.status(401).json({ message: 'No session' });
    const result = await this.loginService.getMe(sessionId);
    return controllerResponse(res, result);
  };


  private generateCookies(
    res: Response,
    data: { SID?: string; accessToken?: string; tempToken?: string },
  ): void {
    const isProduction = config.app.nodeEnv === 'production';
    const options = {
      httpOnly: true,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      secure: isProduction,
    };

    const tokens = [
      {
        name: 'SID',
        value: data.SID,
        expires: 60 * 24 * 14,
      },
      {
        name: 'accessToken',
        value: data.accessToken,
        expires: 60,
      },
      {
        name: 'tempToken',
        value: data.tempToken,
        expires: 15,
      },
    ];

    tokens.forEach((token) => {
      if (token.value !== undefined) {
        // res.cookie(token.name, encrypt(token.value), {
        res.cookie(token.name, token.value, {
          ...options,
          expires: new Date(Date.now() + 1000 * 60 * token.expires),
        });
      }
    });
  }
}
