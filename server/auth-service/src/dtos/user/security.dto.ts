import { z } from '@amrogamal/shared-code';

export const SecurityAdminDto = z.object({
  userId: z.string().min(1),
  email: z.union([z.string().email(), z.null()]),
  phoneNumber: z.union([z.string(), z.null()]),
  password: z.string().min(6),
  role: z.enum(['admin', 'manager', 'user']).optional(),
  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  isPasswordReset: z.boolean().optional(),
  isAccountBlocked: z.boolean().optional(),
  isAccountDeleted: z.boolean().optional(),
  is2FA: z.boolean().optional(),
  FASecret: z.string().optional(),
  prefixS3: z.string().optional(),
  numberFailedLogin: z.number().optional(),
  lastFailedLoginAt: z.date().optional(),
  sign_up_provider: z.string().optional(),
  sign_in_provider: z.string().optional(),
  status: z.enum(['online', 'offline']).optional(),
  terms: z.preprocess(
    (val) => (val === 'true' || val === true ? true : false),
    z.literal(true),
  ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const SecurityUserDto = SecurityAdminDto.pick({
  password: true,
});

export const SecurityAddEmailDto = SecurityAdminDto.pick({
  password: true,
  terms: true,
}).extend({
  email: z.string().email().optional(),
});

export const SecurityAddPhoneDto = z.object({
  phoneNumber: z.string(),
  password: z.string(),
  terms: z.preprocess(
    (val) => (val === 'true' || val === true ? true : false),
    z.literal(true),
  ),
});

export const SecurityUpdatePasswordDto = SecurityAdminDto.pick({
  password: true,
});

export const SecurityAdminUpdateDto = SecurityAdminDto.omit({
  userId: true,
  email: true,
  phoneNumber: true,
  password: true,
  prefixS3: true,
});

export type SecurityDtoType = z.infer<typeof SecurityAdminDto>;
export type SecurityUserDtoType = z.infer<typeof SecurityUserDto>;
export type SecurityAddEmailDtoType = z.infer<typeof SecurityAddEmailDto>;
export type SecurityAddPhoneDtoType = z.infer<typeof SecurityAddPhoneDto>;
export type SecurityUpdatePasswordDtoType = z.infer<
  typeof SecurityUpdatePasswordDto
>;
export type SecurityAdminUpdateDtoType = z.infer<typeof SecurityAdminUpdateDto>;
