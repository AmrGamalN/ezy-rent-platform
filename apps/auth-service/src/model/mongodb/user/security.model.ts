import { Schema, model } from 'mongoose';
import { SecurityDtoType } from '../../../dto/user/security.dto';

const securitySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'user'],
      default: 'user',
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isPasswordReset: { type: Boolean, default: false },
    isAccountBlocked: { type: Boolean, default: false },
    isAccountDeleted: { type: Boolean, default: false },
    is2FA: { type: Boolean, default: false },
    FASecret: { type: String, default: '' },
    prefixS3: { type: String, default: '' },
    numberFailedLogin: { type: Number, default: 0 },
    lastFailedLoginAt: { type: Date, default: null },
    sign_up_provider: { type: String, default: '' },
    sign_in_provider: { type: String, default: '' },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    terms: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Security = model<SecurityDtoType>('user_security', securitySchema);
