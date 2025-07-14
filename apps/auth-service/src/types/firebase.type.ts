export type FirebaseOAuthUser = {
  uid: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
  phoneNumber: string;
  firebase: {
    sign_in_provider: 'google.com' | 'facebook.com' | string;
    identities: {
      [provider: string]: string[];
    };
  };
  iat: number;
  exp: number;
} & Record<string, unknown>;

export type FirebasePhoneUser = {
  user: {
    uid: string;
    phoneNumber: string;
  };
  iat?: number;
  exp?: number;
} & Record<string, unknown>;
