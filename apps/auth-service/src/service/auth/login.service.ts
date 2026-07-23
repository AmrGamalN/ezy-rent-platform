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
// import { SecurityDtoType } from '../../dto/user/security.dto';
// import jwt from 'jsonwebtoken';
import { Profile } from '../../model/mongodb/user/profile.model';
import { redis } from '../../config/redis.config';
// import config from '../../config/env.config';

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
      const error = safeParser<LoginEmailDtoType>({
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
      const error = safeParser<LoginPhoneDtoType>({
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
        statusText: 'CONFLICT',
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
        statusText: 'BAD_REQUEST',
        message: 'Invalid OTP code',
      });

    const token = await this.tokenService.generateToken(
      await this.tokenService.createPayload(security),
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

  // switchAccount = warpError(
  //   async (newSessionId: string): Promise<ResponseOptions> => {
  //     const session = await redis.get(newSessionId);
  //     if (!session)
  //       return serviceResponse({
  //         statusText: 'Unauthorized',
  //         message: 'Unauthorized',
  //       });
  //     const { userId } = JSON.parse(session);

  //     return serviceResponse({
  //       statusText: 'OK',
  //       message: 'Login successful',
  //       data: token,
  //     });
  //   },
  // );

  getMe = warpError(async (sessionId: string) => {
    const session = await redis.get(sessionId);
    if (!session)
      return serviceResponse({
        statusText: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });

    const { userId, email } = JSON.parse(session);
    const profile = await Profile.findOne({ userId })
      .select('_id userId username avatar')
      .lean();

    if (!profile) return serviceResponse({ statusText: 'NOT_FOUND' });

    return serviceResponse({
      statusText: 'OK',
      data: { ...profile, email },
    });
  });
}
