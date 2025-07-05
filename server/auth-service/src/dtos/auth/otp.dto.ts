import { z } from '@amrogamal/shared-code';

export const OtpEmailDto = z.object({
  token: z.string().min(70),
  email: z.string().email(),
  expireAt: z.coerce.date(),
});

export const OtpPhoneDto = z.object({
  phone: z.string(),
  otp: z.string().min(6),
  expireAt: z.coerce.date(),
});

export const OtpVerifyPhoneDto = z.object({
  phone: z.string(),
  otp: z.string().min(6),
});

export type OtpEmailDtoType = z.infer<typeof OtpEmailDto>;
export type OtpPhoneDtoType = z.infer<typeof OtpPhoneDto>;
export type OtpVerifyPhoneDtoType = z.infer<typeof OtpVerifyPhoneDto>;
