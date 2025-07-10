import request from 'supertest';
import speakeasy from 'speakeasy';
import { createTestApp } from '../helpers/createTestApp';
import loginRoutes from '../../src/routes/auth/login.route';
const app = createTestApp(loginRoutes, '/api/v1/auth/');

describe('2ft test', () => {
  let tempToken: string;
  let otp: string;

  beforeEach(async () => {
    const res = await await request(app).post('/api/v1/auth/login/email').send({
      email: 'amr5169520@gmail.com',
      password: 'Amr123456789@',
    });
    const setCookies = Array.isArray(res.headers['set-cookie'])
      ? res.headers['set-cookie']
      : [];
    tempToken = setCookies.find((cookie: string) =>
      cookie.startsWith('tempToken='),
    );

    otp = speakeasy.totp({
      secret: 'ENQXQVD5OM6ECKSXJFKVU3LFHFADS3TS',
      encoding: 'base32',
    });
  });

  it('should return 200 access token when otp are correct', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', [tempToken.split(';')[0]])
      .send({
        otp,
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.message).toBe('Login successful');
  });

  it('should return 400 if otp must be 6 digits', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', [tempToken.split(';')[0]])
      .send({
        otp: '79130',
      });
    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe('otp must be 6 digits');
  });

  it('should return 400 if email is empty', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', [tempToken.split(';')[0]])
      .send({
        otp: '',
      });
    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe('otp is required');
  });

  it('should return 401 if expire token', async () => {
    const res = await request(app).post('/api/v1/auth/login/2fa').send({
      otp: '123456',
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid token expired, please try again');
  });

  it('should return 401 if invalid token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', ['tempToken=9533729ad728'])
      .send({
        otp: '123456',
      });
    expect(res.status).toBe(401);
  });
});
