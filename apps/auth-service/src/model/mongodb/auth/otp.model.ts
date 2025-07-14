import { Schema, model } from 'mongoose';
import { OtpEmailDtoType, OtpPhoneDtoType } from '../../../dto/auth/otp.dto';

const otpEmailSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

const otpPhoneSchema: Schema = new Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export const OtpEmail = model<OtpEmailDtoType>(
  'security_otpEmail',
  otpEmailSchema,
);
export const OtpPhone = model<OtpPhoneDtoType>(
  'security_otpPhone',
  otpPhoneSchema,
);
