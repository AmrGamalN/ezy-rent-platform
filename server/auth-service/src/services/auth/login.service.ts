import {
  LoginEmailDto,
  LoginEmailDtoType,
  LoginPhoneDto,
  LoginPhoneDtoType,
} from "../../dtos/auth/login.dto";
import { TokenService } from "./token.service";
import { AuthLoginService } from "./auth.login.service";
import { Security } from "../../models/mongodb/user/security.model";
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
  safeParser,
} from "@amrogamal/shared-code";
const { warpError } = HandleError.getInstance();
import speakeasy from "speakeasy";

export class LoginEmailService {
  private static instanceService: LoginEmailService;
  private authLoginService: AuthLoginService;
  private tokenService: TokenService;
  constructor() {
    this.tokenService = TokenService.getInstance();
    this.authLoginService = AuthLoginService.getInstance();
  }
  public static getInstance(): LoginEmailService {
    if (!LoginEmailService.instanceService) {
      LoginEmailService.instanceService = new LoginEmailService();
    }
    return LoginEmailService.instanceService;
  }

  loginEmail = warpError(
    async (credential: LoginEmailDtoType): Promise<ResponseOptions> => {
      const error = safeParser({
        data: credential,
        userDto: LoginEmailDto,
      });
      if (!error.success) return error;

      return this.authLoginService.handleLogin(
        credential.email,
        credential.password,
        this.authLoginService.checkEmail
      );
    }
  );

  loginPhone = warpError(
    async (credential: LoginPhoneDtoType): Promise<ResponseOptions> => {
      const error = safeParser({
        data: credential,
        userDto: LoginPhoneDto,
      });
      if (!error.success) return error;

      return this.authLoginService.handleLogin(
        credential.phone,
        credential.password,
        this.authLoginService.checkPhone
      );
    }
  );

  login2FA = warpError(async (credential: string, otp: string) => {
    const security = await Security.findOne({
      $or: [{ email: credential }, { phone: credential }],
      is2FA: true,
    })
      .select("userId email phone role provider")
      .lean();
    if (!security)
      return serviceResponse({
        statusText: "Conflict",
        message: `2FA already enable`,
      });

    const isValid = speakeasy.totp.verify({
      secret: security.FASecret!,
      encoding: "base32",
      token: otp,
      window: 1,
    });
    if (!isValid)
      return serviceResponse({
        statusText: "BadRequest",
        message: "Invalid or expired 2FA code",
      });

    const token = await this.tokenService.generateToken(security);
    return serviceResponse({
      statusText: "OK",
      message: "Login successful",
      data: token,
    });
  });

  loginFacebook = warpError(async (user: any): Promise<ResponseOptions> => {
    return this.authLoginService.firebaseProvider(user, "facebook");
  });

  loginGoogle = warpError(async (user: any): Promise<ResponseOptions> => {
    return this.authLoginService.firebaseProvider(user, "google");
  });
}
