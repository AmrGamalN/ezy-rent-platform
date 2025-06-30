import { Request, Response } from "express";
import { LoginEmailService } from "../../services/auth/login.service";
import { controllerResponse, ResponseOptions } from "@amrogamal/shared-code";
import { Security } from "../../models/mongodb/user/security.model";
import { encrypt } from "../../utils/encrypt.util";
import { auth } from "../../configs/firebase.config";

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

  private loginProvider = async (
    res: Response,
    body: any,
    loginProvider: (body: any) => Promise<ResponseOptions>
  ): Promise<Response> => {
    const result = await loginProvider(body);
    if (!result.success) return res.status(result.status!).json(result);
    const { data, ...responseData } = result;
    return controllerResponse(res, {
      ...responseData,
      accessToken: data.accessToken,
    });
  };

  loginEmail = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(res, req.body, this.loginService.loginEmail);
  };

  loginPhone = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(res, req.body, this.loginService.loginPhone);
  };

  loginFacebook = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(res, req.decode, this.loginService.loginFacebook);
  };

  loginGoogle = async (req: Request, res: Response): Promise<Response> => {
    return this.loginProvider(res, req.decode, this.loginService.loginGoogle);
  };

  login2FA = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.loginService.login2FA(
      req?.curUser?.email as string,
      req.body.otp
    );
    const { data, ...responseData } = result;
    this.generateCookies(res, data);
    return controllerResponse(res, {
      ...responseData,
      accessToken: data.accessToken,
    });
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    const userId = req?.curUser?.userId;
    await auth.revokeRefreshTokens(userId);
    await Security.updateOne({ userId }, { $set: { status: "offline" } });
    return res.status(200).json({
      message: "Logged out successfully",
    });
  };

  private generateCookies(res: Response, tempToken: string) {
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      httpOnly: true,
      sameSite: isProduction ? ("none" as "none") : ("lax" as "lax"),
      secure: isProduction,
    };
    res.cookie("tempToken", encrypt(tempToken), {
      ...options,
      expires: new Date(Date.now() + 1000 * 60 * 5),
    });
  }
}
