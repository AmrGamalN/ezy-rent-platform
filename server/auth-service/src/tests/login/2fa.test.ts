import request from 'supertest';
import { setupTestContext, TestContext } from '../helpers/setup';
import { Application } from 'express';
import { otpCases } from '../__fixtures__/login.fixture';

let app: Application;
beforeAll(async () => {
  await setupTestContext();
  app = TestContext.apps[1];
  otpCases.correct.otp = TestContext.otp;
});

describe('POST /api/v1/auth/login/2fa', () => {
  it('should return 200 and access token when OTP is correct', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', [`tempToken=${TestContext.tokens[1]}`])
      .send({ otp: otpCases.correct.otp });
    expect(res.status).toBe(otpCases.correct.status);
  });

  it('should return 401 for OTP shorter than 6 digits', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Authorization', `Bearer ${TestContext.tokens[1]}`)
      .send({ otp: otpCases.shortOTP.otp });
    expect(res.status).toBe(otpCases.shortOTP.status);
  });

  it('should return 400 when OTP is empty', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', [`tempToken=${TestContext.tokens[1]}`])
      .send({ otp: otpCases.empty.otp });
    expect(res.status).toBe(otpCases.empty.status);
  });

  it('should return 401 for expired token', async () => {
    const res = await request(app).post('/api/v1/auth/login/2fa').send({
      otp: otpCases.noToken.otp,
    });
    expect(res.status).toBe(otpCases.noToken.status);
  });

  it('should return 401 for invalid token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login/2fa')
      .set('Cookie', ['tempToken=9533729ad728'])
      .send({ otp: otpCases.invalidToken.otp });
    expect(res.status).toBe(otpCases.invalidToken.status);
  });
});
