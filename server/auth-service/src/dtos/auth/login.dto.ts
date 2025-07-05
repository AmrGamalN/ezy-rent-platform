import { z } from '@amrogamal/shared-code';
export const LoginEmailDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginPhoneDto = z.object({
  phone: z.string(),
  password: z.string(),
});
export type LoginEmailDtoType = z.infer<typeof LoginEmailDto>;
export type LoginPhoneDtoType = z.infer<typeof LoginPhoneDto>;
