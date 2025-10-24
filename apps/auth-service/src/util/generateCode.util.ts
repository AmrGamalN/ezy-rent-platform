import { OtpEmail } from '../model/mongodb/auth/otp.model';
import crypto from 'crypto';
export const generateEmailOtp = async (): Promise<string> => {
  let token;
  do {
    token = crypto.randomBytes(32).toString('hex');
  } while (await OtpEmail.exists({ token }));
  return token;
};

export const generateOtp = async (): Promise<string> => {
  let token;
  do {
    token = Math.floor(1000 + Math.random() * 9000).toString();
  } while (await OtpEmail.exists({ token }));
  return token;
};
