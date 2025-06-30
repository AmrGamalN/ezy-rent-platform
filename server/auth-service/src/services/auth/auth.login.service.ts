import { Security } from "../../models/mongodb/user/security.model";
import { SecurityDtoType } from "../../dtos/user/security.dto";
import { comparePassword } from "../../utils/encrypt.util";
import { TokenService } from "./token.service";
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
} from "@amrogamal/shared-code";
const { warpError } = HandleError.getInstance();

export class AuthLoginService {
  private static instanceService: AuthLoginService;
  private tokenService: TokenService;
  constructor() {
    this.tokenService = TokenService.getInstance();
  }
  public static getInstance(): AuthLoginService {
    if (!AuthLoginService.instanceService) {
      AuthLoginService.instanceService = new AuthLoginService();
    }
    return AuthLoginService.instanceService;
  }

  checkEmail = async (
    email: string,
    provider?: string
  ): Promise<ResponseOptions> => {
    const security = await Security.findOne({ email }).lean();
    if (!security)
      return serviceResponse({
        statusText: "NotFound",
        message: `This ${provider} account you provided does not match our records`,
      });
    return serviceResponse({
      statusText: "OK",
      data: security,
    });
  };

  checkPhone = async (phoneNumber: string): Promise<ResponseOptions> => {
    const security = await Security.findOne({ phoneNumber }).lean();
    if (!security)
      return serviceResponse({
        statusText: "NotFound",
        message: "This phone number you provided does not match our records",
      });
    return serviceResponse({
      statusText: "OK",
      data: security,
    });
  };

  checkPassword = async (
    plainPassword: string,
    hashPassword: string,
    provider: Record<string, string>
  ): Promise<ResponseOptions> => {
    const result = await comparePassword(plainPassword, hashPassword);
    if (!result) {
      await this.attemptLoginFailed(provider);
      return serviceResponse({
        statusText: "Unauthorized",
        message: "Email or password is wrong, Please try again",
      });
    }
    await this.attemptLoginSuccess(provider);
    return { success: true };
  };

  checkStatusAccount = (data: SecurityDtoType): ResponseOptions => {
    const status =
      (data.isAccountBlocked && "Account is blocked") ||
      (data.isAccountDeleted && "Account is deleted") ||
      (!data.isEmailVerified && "Account is not verified");
    if (status)
      return serviceResponse({
        statusText: "Unauthorized",
        message: status,
      });
    return { success: true };
  };

  checkAttemptLogin = async (
    data: SecurityDtoType,
    provider?: Record<string, string>
  ) => {
    if (Number(data.numberFailedLogin) >= 3) {
      const currentTime = Date.now();
      const lastFailedLoginAt = new Date(
        data.lastFailedLoginAt as Date
      ).getTime();
      const diffTime = (currentTime - lastFailedLoginAt) / (60 * 1000);

      if (diffTime < 10) {
        const remainingTime = Math.ceil(10 - diffTime);
        return serviceResponse({
          statusText: "Unauthorized",
          message: `Account locked due to multiple failed logins. Try again in ${remainingTime} minutes.`,
        });
      }

      await this.attemptLoginSuccess(
        provider ? provider : { email: data.email! }
      );
    }
    return { success: true };
  };

  attemptLoginFailed = async (provider: Record<string, string>) => {
    await Security.updateOne(provider, {
      $inc: { numberFailedLogin: 1 },
      $set: { lastFailedLoginAt: new Date().toISOString() },
    });
  };

  attemptLoginSuccess = async (provider: Record<string, string>) => {
    await Security.updateOne(provider, {
      $set: { numberFailedLogin: 0 },
      lastFailedLoginAt: null,
    });
  };

  handleLogin = async (
    identifier: string,
    password: string,
    getUser: (identifier: string) => Promise<ResponseOptions>,
    type?: string
  ): Promise<ResponseOptions> => {
    const checkUser = await getUser(identifier);
    if (!checkUser.success) return checkUser;
    const user = checkUser.data;

    const checkStatusAccount = await this.checkStatusAccount(user);
    if (!checkStatusAccount.success) return checkStatusAccount;

    const provider: Record<string, string> =
      type === "email"
        ? { email: user?.email }
        : { phoneNumber: user?.phoneNumber! };
    const checkAttemptLogin = await this.checkAttemptLogin(user, provider);
    if (!checkAttemptLogin.success) return checkAttemptLogin;

    const checkPassword = await this.checkPassword(
      password,
      user.password,
      provider
    );
    if (!checkPassword.success) return checkPassword;

    const check2FA = await this.check2FA(user, provider);
    if (check2FA.success) return check2FA;

    const tokens = await this.tokenService.generateToken(user.userId);
    return serviceResponse({
      statusText: "OK",
      message: "Login successful",
      data: tokens,
    });
  };

  check2FA = (data: SecurityDtoType, provider: Record<string, string>) => {
    if (data.is2FA == true)
      return serviceResponse({
        statusText: "OK",
        message: "Two-factor authentication required, Please enter the code.",
        data: this.tokenService.generate2faToken(provider),
      });
    return { success: false };
  };

  firebaseProvider = warpError(
    async (user: any, identifier: string): Promise<ResponseOptions> => {
      const checkUser = await this.checkEmail(user, identifier);
      if (!checkUser.success) return checkUser;

      const checkStatusAccount = await this.checkStatusAccount(user);
      if (!checkStatusAccount.success) return checkStatusAccount;

      const checkAttemptLogin = await this.checkAttemptLogin(user);
      if (!checkAttemptLogin.success) return checkAttemptLogin;

      const check2FA = await this.check2FA(user, { email: user.email });
      if (check2FA.success) return check2FA;

      const tokens = await this.tokenService.generateToken(
        checkUser.data.userId
      );
      return serviceResponse({
        statusText: "OK",
        message: "Login successful",
        data: tokens,
      });
    }
  );
}
