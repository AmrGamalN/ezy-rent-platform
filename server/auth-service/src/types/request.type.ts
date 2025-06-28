type UserRoleType = "user" | "admin" | "manager";

export type UserRequestType = {
  userId: string;
  email: string;
  phoneNumber?: string;
  role: UserRoleType;
  name?: string;
  profileImage?: {
    imageUrl: string;
    key: string;
  };
  userName?: string;
  dateToJoin?: string;
  sign_up_provider?: string;
  sign_in_provider?: string;
  isEmailVerified?: boolean;
  lastSeen: string;
};
