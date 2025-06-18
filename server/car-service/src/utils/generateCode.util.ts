import { OtpEmail } from "../models/mongodb/auth/otp.model";
import crypto from "crypto";
export const generateEmailOtp = async (): Promise<string> => {
  let token;
  do {
    token = crypto.randomBytes(32).toString("hex");
  } while (await OtpEmail.exists({ token }));
  return token;
};

export const generatePhoneOtp = async (): Promise<string> => {
  let token;
  do {
    token = crypto.randomBytes(6).toString("hex");
  } while (await OtpEmail.exists({ token }));
  return token;
};
