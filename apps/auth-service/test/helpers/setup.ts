import axios from 'axios';
import request from 'supertest';
import speakeasy from 'speakeasy';
import { Application } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from '../../src/routes/auth/auth.route';
import dotenv from 'dotenv';
import { logger } from '@amrogamal/shared-code';
dotenv.config();

const createTestApp = (): Application => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/v1/auth', routes);
  return app;
};

export const TestContext: {
  apps: Application[];
  tokens: string[];
  login2FA: string;
  otp: string;
} = {
  apps: [],
  tokens: [],
  login2FA: '',
  otp: '',
};

const users = [
  'amr5189520@gmail.com', // access
  'amr5169520@gmail.com', // temp & 2fa
  'ezyrent.eg@gmail.com', // pass
];

export const setupTestContext = async (): Promise<void> => {
  try {
    const otp = createOtp('ENQXQVD5OM6ECKSXJFKVU3LFHFADS3TS');
    TestContext.otp = otp;
    for (let i = 0; i < users.length; i++) {
      const app = createTestApp();
      TestContext.apps.push(app);
      const token = await loginEmail(users[i], app);
      TestContext.apps.push(app);
      TestContext.tokens.push(token);
    }
    TestContext.login2FA = await login2FA();
  } catch (error) {
    logger.error(error);
  }
};

const loginEmail = async (email: string, app: Application): Promise<string> => {
  const res = await request(app).post('/api/v1/auth/login/email').send({
    email,
    password: 'Amr123456789@',
  });
  if (
    res.body.message ===
    'Two-factor authentication required, Please enter the code'
  ) {
    const setCookies = Array.isArray(res.headers['set-cookie'])
      ? res.headers['set-cookie']
      : [];
    const token = extractCookie(setCookies, 'tempToken');
    return token as string;
  }
  return await verifyCustomToken(res.body.accessToken);
};

const login2FA = async (): Promise<string> => {
  const res = await request(TestContext.apps[1])
    .post('/api/v1/auth/login/email')
    .send({
      email: 'amr5169520@gmail.com',
      password: 'Amr123456789@',
    });
  const setCookies = Array.isArray(res.headers['set-cookie'])
    ? res.headers['set-cookie']
    : [];
  const tempToken = setCookies.find((c: string) => c.startsWith('tempToken='));
  const otp = createOtp('ENQXQVD5OM6ECKSXJFKVU3LFHFADS3TS');
  const twoFA = await request(TestContext.apps[2])
    .post('/api/v1/auth/login/2fa')
    .set('Cookie', [tempToken?.split(';')[0]])
    .send({ otp });

  return await verifyCustomToken(twoFA.body.accessToken);
};

const createOtp = (secret: string): string => {
  return speakeasy.totp({ secret, encoding: 'base32' });
};

const extractCookie = (cookies: string[], key: string): string | undefined => {
  const cookie = cookies.find((c) => c.startsWith(`${key}=`));
  return cookie?.split(';')[0].split('=')[1];
};

const verifyCustomToken = async (token: string): Promise<string> => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`;
  const response = await axios.post(url, {
    token,
    returnSecureToken: true,
  });
  return response.data.idToken;
};
