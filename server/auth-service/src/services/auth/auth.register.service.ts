import { redis } from "../../configs/redis.config";
import { OtpEmail } from "../../models/mongodb/auth/otp.model";
import { Security } from "../../models/mongodb/user/security.model";
import { sendEmail } from "../../utils/sendEmail.util";
import { sendVerifyEmail } from "../../utils/message.util";
import { serviceResponse } from "../../utils/response.util";
import { generateEmailOtp } from "../../utils/generateCode.util";
<<<<<<< Updated upstream
import { HandleError } from "../../middlewares/handleError.middleware";
=======
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
import { HandleError } from "../../middlewares/handleError.middleware";
=======
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
} from "@amrogamal/shared-code";
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
const { warpError } = HandleError.getInstance();
import {
  RegisterEmailDtoType,
  RegisterPhoneDtoType,
} from "../../dtos/auth/register.dto";
<<<<<<< Updated upstream
import { ResponseOptions } from "../../types/response.type";
=======
<<<<<<< Updated upstream
import { HandleError, ResponseOptions, serviceResponse } from "common";
=======
<<<<<<< Updated upstream
import { ResponseOptions } from "../../types/response.type";
=======

>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
import { Profile } from "../../models/mongodb/user/profile.model";
import { v4 as uuidv4 } from "uuid";

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
        statusText: "Conflict",
        message:
          "Email address already exists, Please try again with a different email address",
      });
    }
    return serviceResponse({
      statusText: "OK",
    });
  };

  checkPhone = async (phone: string): Promise<ResponseOptions> => {
    const user = await Security.findOne({ phone });
    if (user) {
      return serviceResponse({
        statusText: "Conflict",
        message:
          "Phone number already exists, Please try again with a different phone number",
      });
    }
    return serviceResponse({
      statusText: "OK",
    });
  };

  private addDataInCache = async (
    data: RegisterEmailDtoType,
    token: string
  ): Promise<ResponseOptions> => {
    const resultCache = await redis.setEx(
      `token:${token}`,
      600,
      JSON.stringify(data)
    );
    if (resultCache != "OK")
      return serviceResponse({
        statusText: "InternalServerError",
        message: "Error while register, try again later",
      });
    return serviceResponse({
      statusText: "OK",
    });
  };

  sendEmailVerification = async (
    data: RegisterEmailDtoType,
    email: string
  ): Promise<ResponseOptions> => {
    const checkEmail = await OtpEmail.findOne({ email });
    if (checkEmail)
      return serviceResponse({
        statusText: "Conflict",
        message:
          "verification link already exists or the email already register but not verify. Please check your email",
      });
    const token = await generateEmailOtp();
    await OtpEmail.create({
      email,
      token,
      expiresAt: new Date(Date.now() + 120_000),
    });

    const link = `${process.env.BACKEND_URL}/auth/verify-email/${token}`;
    const resultSendEmail = await sendEmail(
      email,
      "Email Verification",
      sendVerifyEmail(link, data?.username)
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
        statusText: "BadRequest",
        message: "Expired time, return to signup page and register again",
      });

    const link = `${process.env.BACKEND_URL}/auth/verify-email/${checkEmail.token}`;
    const resultSendEmail = await sendEmail(
      email,
      "Email Verification",
      sendVerifyEmail(link, checkEmail.email)
    );
    if (!resultSendEmail.success) return resultSendEmail;
    await OtpEmail.updateOne({ email }, { $inc: { numSend: 1 } });
    return serviceResponse({
      statusText: "OK",
      message: "Email send successfully",
    });
  });

  phoneVerification = async (
    data: RegisterPhoneDtoType
  ): Promise<ResponseOptions> => {
    const checkPhone = await this.checkPhone(data.phone);
    if (!checkPhone.success) return checkPhone;

    const resultCache = await this.addDataInCache(data, data.phone);
    if (!resultCache.success) return resultCache;

    return { success: true };
  };

  createFirebaseProvider = async (
    data: any,
    provider: string
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
      data: any,
      provider: string,
      createUser: (data: any, provider: string) => Promise<ResponseOptions>
    ): Promise<ResponseOptions> => {
      const checkEmail = await this.checkEmail(data.user.email);
      if (!checkEmail.success) return checkEmail;
      await createUser(data.user, provider);
      return serviceResponse({
        statusText: "OK",
        message: "Register successfully",
      });
    }
  );
}
