import { Request, Response } from 'express';
import { LoginEmailService } from '../../service/auth/login.service';
import { controllerResponse, ResponseOptions } from '@amrogamal/shared-code';
import { Security } from '../../model/mongodb/user/security.model';
import { encrypt } from '../../util/encrypt.util';
import { auth } from '../../config/firebase.config';
import { LoginEmailDtoType, LoginPhoneDtoType } from '../../dto/auth/login.dto';
import { FirebaseOAuthUser } from '../../types/firebase.type';

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
    return controllerResponse(res, {
      ...responseData,
      // accessToken: encrypt(data.accessToken),
      accessToken: data.accessToken,
    });
  };

  loginEmail = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider<LoginEmailDtoType>(
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
    this.generateCookies(res, data.accessToken);
    res.clearCookie('tempToken');
    return controllerResponse(res, {
      ...responseData,
      accessToken: data.accessToken,
    });
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    const userId = String(req?.curUser?.userId);
    await auth.revokeRefreshTokens(userId);
    await Security.updateOne({ userId }, { $set: { status: 'offline' } });
    return res.status(200).json({
      message: 'Logged out successfully',
    });
  };

  private generateCookies(res: Response, tempToken: string): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const options = {
      httpOnly: true,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      secure: isProduction,
    };
    res.cookie('tempToken', encrypt(tempToken), {
      ...options,
      expires: new Date(Date.now() + 1000 * 60 * 5),
    });
  }
}
