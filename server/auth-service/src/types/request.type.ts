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
  dateToJoin?: string;
  lastLogin: string;
  sign_up_provider?: string;
  sign_in_provider?: string;
  isEmailVerified?: boolean;
};
