type UserRoleType = 'user' | 'admin' | 'manager';
export type UserToken = {
  userId: string;
  email: string;
  role: UserRoleType;
};
