import {
  LoginEmailDto,
  LoginEmailDtoType,
  LoginPhoneDto,
  LoginPhoneDtoType,
} from '../../dto/auth/login.dto';
import { TokenService } from './token.service';
import { AuthLoginService } from './auth.login.service';
import { Security } from '../../model/mongodb/user/security.model';
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
  safeParser,
} from '@amrogamal/shared-code';
const { warpError } = HandleError.getInstance();
import speakeasy from 'speakeasy';
import { FirebaseOAuthUser } from '../../types/firebase.type';
import { Profile } from '../../model/mongodb/user/profile.model';
import { SecurityDtoType } from '../../dto/user/security.dto';
import { UserToken } from '../../types/request.type';

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
        this.authLoginService.checkEmail,
        'email',
      );
    },
  );

  loginPhone = warpError(
    async (credential: LoginPhoneDtoType): Promise<ResponseOptions> => {
      const error = safeParser({
        data: credential,
        userDto: LoginPhoneDto,
      });
      if (!error.success) return error;

      return this.authLoginService.handleLogin(
        credential.phoneNumber,
        credential.password,
        this.authLoginService.checkPhone,
        'phone',
      );
    },
  );

  login2FA = warpError(async (credential: string, otp: string) => {
    const security = await Security.findOne({
      $or: [{ email: credential }, { phoneNumber: credential }],
      is2FA: true,
    }).lean();
    if (!security)
      return serviceResponse({
        statusText: 'Conflict',
        message: `2FA already enable`,
      });
    const isValid = speakeasy.totp.verify({
      secret: security.FASecret!,
      encoding: 'base32',
      token: otp,
      window: 1,
    });
    if (!isValid)
      return serviceResponse({
        statusText: 'BadRequest',
        message: 'Invalid OTP code',
      });

    const token = await this.tokenService.generateToken(
      await this.createPayload(security),
    );
    return serviceResponse({
      statusText: 'OK',
      message: 'Login successful',
      data: token,
    });
  });

  loginFacebook = warpError(
    async (user: FirebaseOAuthUser): Promise<ResponseOptions> => {
      return this.authLoginService.firebaseProvider(user, 'facebook');
    },
  );

  loginGoogle = warpError(
    async (user: FirebaseOAuthUser): Promise<ResponseOptions> => {
      return this.authLoginService.firebaseProvider(user, 'google');
    },
  );

  private createPayload = async (
    security: SecurityDtoType,
  ): Promise<UserToken> => {
    const profile = await Profile.findOne({ userId: security.userId }).lean();
    const payload: UserToken = {
      userId: security.userId,
      email: security.email as string,
      phoneNumber: security.phoneNumber as string,
      role: security.role as 'user' | 'admin' | 'manager',
      userName: profile?.username,
      avatar: profile?.avatar as { imageUrl: string; key: string },
      dateToJoin: profile?.dateJoined
        ? new Date(profile.dateJoined).toString()
        : '',
      lastLogin: profile?.lastLogin
        ? new Date(profile.lastLogin).toString()
        : '',
      isEmailVerified: security.isEmailVerified,
      isPhoneVerified: security.isPhoneVerified,
      isPasswordReset: security.isPasswordReset,
      isAccountBlocked: security.isAccountBlocked,
      isAccountDeleted: security.isAccountDeleted,
      sign_up_provider: security.sign_up_provider,
      sign_in_provider: security.sign_in_provider,
    };
    return payload;
  };
}
