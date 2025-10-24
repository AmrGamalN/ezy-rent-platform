import { redis } from '../../config/redis.config';
import { OtpEmail } from '../../model/mongodb/auth/otp.model';
import { Security } from '../../model/mongodb/user/security.model';
import { sendEmail } from '../../util/sendEmail.util';
import { sendVerifyEmail } from '../../util/message.util';
import { generateEmailOtp } from '../../util/generateCode.util';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
} from '@amrogamal/shared-code';

const { warpError } = HandleError.getInstance();
import {
  RegisterEmailDtoType,
  RegisterPhoneDtoType,
} from '../../dto/auth/register.dto';

import { Profile } from '../../model/mongodb/user/profile.model';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseOAuthUser } from '../../types/firebase.type';
import { bucketName, s3Client } from '../../config/s3.config';
import config from '../../config/env.config';

export class AuthRegisterService {
  private static instance: AuthRegisterService;

  static getInstance(): AuthRegisterService {
    if (!AuthRegisterService.instance) {
      AuthRegisterService.instance = new AuthRegisterService();
    }
    return AuthRegisterService.instance;
  }

  checkEmail = async (email: string): Promise<ResponseOptions> => {
    const user = await Security.findOne({ email });
    if (user) {
      return serviceResponse({
        statusText: 'Conflict',
        message:
          'Email address already exists, Please try again with a different email address',
      });
    }
    return serviceResponse({
      statusText: 'OK',
    });
  };

  checkPhone = async (phoneNumber: string): Promise<ResponseOptions> => {
    const user = await Security.findOne({ phoneNumber });
    if (user) {
      return serviceResponse({
        statusText: 'Conflict',
        message:
          'Phone number already exists, Please try again with a different phone number',
      });
    }
    return serviceResponse({
      statusText: 'OK',
    });
  };

  private addDataInCache = async (
    data: RegisterEmailDtoType,
    token: string,
  ): Promise<ResponseOptions> => {
    const resultCache = await redis.setEx(
      `token:${token}`,
      600,
      JSON.stringify(data),
    );
    if (resultCache !== 'OK')
      return serviceResponse({
        statusText: 'InternalServerError',
        message: 'Error while register, try again later',
      });
    return serviceResponse({
      statusText: 'OK',
    });
  };

  sendEmailVerification = async (
    data: RegisterEmailDtoType,
    email: string,
  ): Promise<ResponseOptions> => {
    const checkEmail = await OtpEmail.findOne({ email });
    if (checkEmail)
      return serviceResponse({
        statusText: 'Conflict',
        message:
          'verification link already exists or the email already register but not verify. Please check your email',
      });
    const token = await generateEmailOtp();
    await OtpEmail.create({
      email,
      token,
      expiresAt: new Date(Date.now() + 120_000),
    });

    const link = `${config.app.backendUrl}/auth/verify-email/${token}`;
    const resultSendEmail = await sendEmail(
      email,
      'Email Verification',
      sendVerifyEmail(link, data?.username),
    );
    if (!resultSendEmail.success) return resultSendEmail;

    const resultCache = await this.addDataInCache(data, token);
    if (!resultCache.success) return resultCache;

    return { success: true };
  };

  resendEmail = warpError(async (email: string): Promise<ResponseOptions> => {
    const checkEmail = await OtpEmail.findOne({ email });
    if (!checkEmail)
      return serviceResponse({
        statusText: 'BadRequest',
        message: 'Expired time, return to signup page and register again',
      });

    const link = `${config.app.backendUrl}/auth/verify-email/${checkEmail.token}`;
    const resultSendEmail = await sendEmail(
      email,
      'Email Verification',
      sendVerifyEmail(link, checkEmail.email),
    );
    if (!resultSendEmail.success) return resultSendEmail;
    await OtpEmail.updateOne({ email }, { $inc: { numSend: 1 } });
    return serviceResponse({
      statusText: 'OK',
      message: 'Email send successfully',
    });
  });

  phoneVerification = async (
    data: RegisterPhoneDtoType,
  ): Promise<ResponseOptions> => {
    const checkPhone = await this.checkPhone(data.phoneNumber);
    if (!checkPhone.success) return checkPhone;

    const resultCache = await this.addDataInCache(data, data.phoneNumber);
    if (!resultCache.success) return resultCache;

    return { success: true };
  };

  createFirebaseProvider = async (
    data: FirebaseOAuthUser,
    provider: string,
  ): Promise<ResponseOptions> => {
    const isExistUser = await Security.exists({ email: data.email });
    if (!isExistUser) {
      await Promise.all([
        Security.create({
          userId: data.uid,
          email: data.email,
          isEmailVerified: true,
          terms: true,
          sign_up_provider: provider,
          prefixS3: uuidv4(),
        }),
        Profile.create({
          userId: data.uid,
          avatar: { url: data.picture },
          username: data.name,
        }),
      ]);
      return { success: true };
    }
    return { success: true };
  };

  handleProvider = warpError(
    async (
      data: FirebaseOAuthUser,
      provider: string,
      createUser: (
        data: FirebaseOAuthUser,
        provider: string,
      ) => Promise<ResponseOptions>,
    ): Promise<ResponseOptions> => {
      const checkEmail = await this.checkEmail(data.email);
      if (!checkEmail.success) return checkEmail;
      await createUser(data, provider);
      return serviceResponse({
        statusText: 'OK',
        message: 'Register successfully',
      });
    },
  );

  uploadImage = async (
    file: Express.Multer.File,
    key: string,
  ): Promise<{ key: string; url: string } | null> => {
    if (!file) return null;

    // const buffer = Buffer.isBuffer(file.buffer)
    //   ? file.buffer
    //   : Buffer.from(file.buffer?.data as string);
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );
    if (result.$metadata.httpStatusCode !== 200) return null;
    return {
      key,
      url: `https://${bucketName}.s3.amazonaws.com/${key}`,
    };
  };

  deleteImage = async (key: string): Promise<void> => {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
  };
}
