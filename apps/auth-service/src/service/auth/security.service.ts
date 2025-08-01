import { Security } from '../../model/mongodb/user/security.model';
import { hashPassword } from '../../util/encrypt.util';
import { sendResetPasswordEmail } from '../../util/message.util';
import { sendEmail } from '../../util/sendEmail.util';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import {
  HandleError,
  ResponseOptions,
  serviceResponse,
} from '@amrogamal/shared-code';
import { AuthLoginService } from './auth.login.service';

import { auth } from '../../config/firebase.config';
const { warpError } = HandleError.getInstance();

export class SecurityService {
  private static instanceService: SecurityService;
  private authLoginService: AuthLoginService;
  constructor() {
    this.authLoginService = AuthLoginService.getInstance();
  }
  public static getInstance(): SecurityService {
    if (!SecurityService.instanceService) {
      SecurityService.instanceService = new SecurityService();
    }
    return SecurityService.instanceService;
  }

  generate2FA = warpError(async (email: string) => {
    const security = await Security.findOne({ email }).select('is2FA').lean();
    if (security && security.is2FA === true)
      return serviceResponse({
        statusText: 'Conflict',
        message: `2FA already enable`,
      });

    const secret = speakeasy.generateSecret({
      name: `Eazy Rent: ${email}`,
      length: 20,
    });

    await Security.updateOne(
      { email },
      {
        $set: {
          FASecret: secret.base32,
        },
      },
    );

    if (!secret.otpauth_url)
      return serviceResponse({
        statusText: 'InternalServerError',
        message: 'Failed to generate 2FA secret',
      });

    const qrCode = await QRCode.toBuffer(secret?.otpauth_url);
    return serviceResponse({
      statusText: 'Created',
      message:
        'Scan the QR code in app authenticator, Enter the 6-digit code to complete verification',
      data: qrCode,
    });
  });

  verify2FA = warpError(async (email: string, otp: string) => {
    const security = await Security.findOne({ email })
      .select('is2FA FASecret')
      .lean();
    if (security && security.is2FA === true)
      return serviceResponse({
        statusText: 'Conflict',
        message: `2FA already enable`,
      });

    const isValid = speakeasy.totp.verify({
      secret: String(security?.FASecret),
      encoding: 'base32',
      token: otp,
      window: 1,
    });
    if (!isValid)
      return serviceResponse({
        statusText: 'BadRequest',
        message: 'Invalid or expired 2FA code',
      });

    await Security.findOneAndUpdate({ email }, { $set: { is2FA: true } });
    return serviceResponse({ statusText: 'OK', message: '2FA verified' });
  });

  sendResetpasswordLink = warpError(
    async (email: string): Promise<ResponseOptions> => {
      const user = await Security.findOne({ email }).lean();
      if (!user)
        return serviceResponse({
          statusText: 'NotFound',
          message: 'User not found',
        });

      const status = this.authLoginService.checkStatusAccount(user, 'email');
      if (!status.success) return status;

      const resetLink = await auth.generatePasswordResetLink(email);
      const resultSendEmail = await sendEmail(
        email,
        'Reset password',
        sendResetPasswordEmail(resetLink, email),
      );
      if (!resultSendEmail.success) return resultSendEmail;

      return serviceResponse({
        statusText: 'OK',
        message: 'Reset password link has been sent to your email address',
      });
    },
  );

  updatePassword = warpError(
    async (email: string, password: string): Promise<ResponseOptions> => {
      const updatePassword = await Security.findOneAndUpdate(
        { email },
        { $set: { password: await hashPassword(password) } },
      );
      if (!updatePassword)
        return serviceResponse({
          statusText: 'BadRequest',
          error: 'Something went wrong, please try again',
        });
      return serviceResponse({
        statusText: 'OK',
        message: 'Password has been reset successfully',
      });
    },
  );
}
