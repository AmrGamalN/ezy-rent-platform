import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { redis } from '../../config/redis.config';
import { OtpEmail } from '../../model/mongodb/auth/otp.model';
import { Profile } from '../../model/mongodb/user/profile.model';
import { Security } from '../../model/mongodb/user/security.model';
import { hashPassword } from '../../util/encrypt.util';
import {
  RegisterEmailDto,
  RegisterEmailDtoType,
  RegisterPhoneDtoType,
} from '../../dto/auth/register.dto';
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
    async (
      data: RegisterEmailDtoType,
      file: Express.Multer.File,
    ): Promise<ResponseOptions> => {
      const { email } = data;
      const error = safeParser<RegisterEmailDtoType>({
        data,
        userDto: RegisterEmailDto,
      });
      if (!error.success) return error;

      const checkEmail = await this.authRegisterService.checkEmail(email!);
      if (!checkEmail.success) return checkEmail;

      const userCacheData = {
        ...data,
        file: file
          ? {
              ...file,
              buffer: file.buffer.toString('base64'),
            }
          : null,
      };

      const sendEmail = await this.authRegisterService.sendEmailVerification(
        userCacheData,
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
        statusText: 'BAD_REQUEST',
        data: 'already_used',
        message:
          'This link has already been used to verify your account. Please log in or request a new verification email if needed.',
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
      const error = safeParser<RegisterPhoneDtoType>({
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
      return await this.createUser(data.user.phoneNumber, 'phone');
    },
  );

  private createUser = warpError(async (token: string, provider: string) => {
    const getDataCaching = await redis.get(`token:${token}`);
    if (!getDataCaching)
      return serviceResponse({
        statusText: 'BAD_REQUEST',
        data: 'expired_link',
        message:
          'Your verification link has expired. Please request a new verification email to continue.',
      });

    // restore data from cache
    const { username, phone, email, password, terms, file } =
      JSON.parse(getDataCaching);
    const restoredFile = file
      ? {
          ...file,
          buffer: Buffer.from(file.buffer, 'base64'),
        }
      : null;

    const key = 'profile/' + uuidv4() + '-' + restoredFile.originalname;
    const { url } = (await this.authRegisterService.uploadImage(
      restoredFile,
      key,
    )) as {
      url: string;
    };

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const userId = uuidv4();
        await Security.create(
          [
            {
              userId,
              password: await hashPassword(password),
              phone: phone,
              email: email,
              prefixS3: uuidv4(),
              sign_up_provider: provider,
              isEmailVerified: true,
              terms: terms,
            },
          ],
          { session },
        );

        await Profile.create(
          [
            {
              userId,
              username: username,
              avatar: {
                url: url,
                key: key,
              },
            },
          ],
          { session },
        );
        await redis.del(`token:${token}`);
      });
      return serviceResponse({
        statusText: 'CREATED',
        message: `Awesome! Your ${provider} has been verified successfully. Let’s get started!`,
      });
    } catch (err: unknown) {
      if (key) await this.authRegisterService.deleteImage(key);
      await redis.del(`token:${token}`);
      if (err instanceof Error) {
        throw new CustomError('INTERNAL', 500, err.message, false);
      } else {
        throw new CustomError('INTERNAL', 500, 'INTERNAL', false);
      }
    } finally {
      await session.endSession();
    }
  });
}
