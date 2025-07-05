import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { redis } from '../../configs/redis.config';
import { OtpEmail } from '../../models/mongodb/auth/otp.model';
import { Profile } from '../../models/mongodb/user/profile.model';
import { Security } from '../../models/mongodb/user/security.model';
import { hashPassword } from '../../utils/encrypt.util';
import {
  RegisterEmailDto,
  RegisterEmailDtoType,
  RegisterPhoneDtoType,
} from '../../dtos/auth/register.dto';
import { AuthRegisterService } from './auth.register.service';
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
  safeParser,
  CustomError,
} from '@amrogamal/shared-code';
import {
  FirebaseOAuthUser,
  FirebasePhoneUser,
} from '../../types/firebase.type';
const { warpError } = HandleError.getInstance();

export class RegisterService {
  private static instance: RegisterService;
  private authRegisterService: AuthRegisterService;

  private constructor() {
    this.authRegisterService = AuthRegisterService.getInstance();
  }

  static getInstance(): RegisterService {
    if (!RegisterService.instance) {
      RegisterService.instance = new RegisterService();
    }
    return RegisterService.instance;
  }

  registerEmail = warpError(
    async (data: RegisterEmailDtoType): Promise<ResponseOptions> => {
      const { email } = data;
      const error = safeParser({
        data,
        userDto: RegisterEmailDto,
      });
      if (!error.success) return error;

      const checkEmail = await this.authRegisterService.checkEmail(email!);
      if (!checkEmail.success) return checkEmail;

      const sendEmail = await this.authRegisterService.sendEmailVerification(
        data,
        email!,
      );
      if (!sendEmail.success) return sendEmail;

      return serviceResponse({
        statusText: 'OK',
        message:
          'Thanks a bunch for signing up. Just one last step: please confirm your email address',
      });
    },
  );

  verifyEmail = warpError(async (token: string): Promise<ResponseOptions> => {
    const checkToken = await OtpEmail.deleteOne({ token });
    if (!checkToken.deletedCount) {
      return serviceResponse({
        statusText: 'BadRequest',
        message:
          'Try verifying your email again. Your request to verify your email has expired or the link has already been used.',
      });
    }
    return await this.createUser(token, 'email');
  });

  registerFacebook = warpError(
    async (data: FirebaseOAuthUser): Promise<ResponseOptions> => {
      return this.authRegisterService.handleProvider(
        data,
        'facebook',
        this.authRegisterService.createFirebaseProvider,
      );
    },
  );

  registerGoogle = warpError(
    async (data: FirebaseOAuthUser): Promise<ResponseOptions> => {
      return this.authRegisterService.handleProvider(
        data,
        'google',
        this.authRegisterService.createFirebaseProvider,
      );
    },
  );

  registerPhone = warpError(
    async (data: RegisterPhoneDtoType): Promise<ResponseOptions> => {
      const error = safeParser({
        data,
        userDto: RegisterEmailDto,
      });
      if (!error.success) return error;

      const verifyPhone =
        await this.authRegisterService.phoneVerification(data);
      if (!verifyPhone.success) return verifyPhone;

      return serviceResponse({
        statusText: 'OK',
        message:
          'Thanks a bunch for signing up. Just one last step: please confirm your phone number',
      });
    },
  );

  verifyPhone = warpError(
    async (data: FirebasePhoneUser): Promise<ResponseOptions> => {
      return await this.createUser(data.user.phone, 'phone');
    },
  );

  private createUser = warpError(async (token: string, provider: string) => {
    const getDataCaching = await redis.get(`token:${token}`);
    if (!getDataCaching)
      return serviceResponse({
        statusText: 'BadRequest',
        message:
          'Your verification code has expired. Please request a new code and try again.',
      });
    const data = JSON.parse(getDataCaching);
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const userId = uuidv4();
        await Security.create(
          [
            {
              userId,
              password: await hashPassword(data.password),
              phone: data?.phone,
              email: data?.email,
              prefixS3: uuidv4(),
              sign_up_provider: provider,
              isEmailVerified: true,
              terms: data.terms,
            },
          ],
          { session },
        );

        await Profile.create(
          [
            {
              userId,
              username: data.username,
            },
          ],
          { session },
        );
        await redis.del(`token:${token}`);
      });
      return serviceResponse({
        statusText: 'Created',
        message: `Awesome! Your ${provider} has been verified successfully. Let’s get started!`,
      });
    } catch (err: any) {
      throw new CustomError('InternalServerError', 500, err.message, false);
    } finally {
      await session.endSession();
    }
  });
}
