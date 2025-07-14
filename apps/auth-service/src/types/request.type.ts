import './express';
export type UserToken = {
  userId: string;
  email: string;
  phoneNumber?: string;
  role: 'user' | 'admin' | 'manager';
  userName?: string;
  avatar?: {
    imageUrl: string;
    key: string;
  };
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isPasswordReset?: boolean;
  isAccountBlocked?: boolean;
  isAccountDeleted?: boolean;
  dateToJoin?: string;
  lastLogin?: string;
  lastSeen?: Date;
  sign_up_provider?: string;
  sign_in_provider?: string;
};
