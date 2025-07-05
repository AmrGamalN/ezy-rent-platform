export type FirebaseOAuthUser = {
  uid: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
  phone_number: string;
  firebase: {
    sign_in_provider: 'google.com' | 'facebook.com' | string;
    identities: {
      [provider: string]: string[];
    };
  };
  iat: number;
  exp: number;
  [key: string]: any;
};

export type FirebasePhoneUser = {
  user: {
    uid: string;
    phone: string;
  };
  iat?: number;
  exp?: number;
  [key: string]: any;
};
