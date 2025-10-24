import './express';
export type UserToken = {
  userId: string;
  email: string;
  role: 'user' | 'admin' | 'manager';
  phoneNumber?: string;
  userName?: string;
  avatar?: {
    imageUrl: string;
    key: string;
  };
  lastLogin?: string;
  lastSeen?: Date;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isPasswordReset?: boolean;
  isAccountBlocked?: boolean;
  isAccountDeleted?: boolean;
  dateToJoin?: string;
  sign_up_provider?: string;
  sign_in_provider?: string;
};
