import request from 'supertest';
import { setupTestContext, TestContext } from '../helpers/setup';
import { invalidEmails, passwordCases } from '../__fixtures__/login.fixture';

describe('Security API', () => {
  beforeAll(async () => {
    await setupTestContext();
  });

  describe('2FA - /2fa/generate', () => {
    it('should return 201 and QR code buffer when 2FA is generated', async () => {
      const res = await request(TestContext.apps[0])
        .post('/api/v1/auth/security/2fa/generate')
        .set('authorization', `Bearer ${TestContext.tokens[0]}`);
      expect(res.status).toBe(201);
    });

    it('should return 409 if 2FA is already generated', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/generate')
        .set('authorization', `Bearer ${TestContext.login2FA}`);
      expect(res.status).toBe(409);
    });

    it('should return 401 if invalid access token', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/generate')
        .set('authorization', `Bearer notAccessToken`);
      expect(res.status).toBe(401);
    });

    it('should return 401 if user is not logged in', async () => {
      const res = await request(TestContext.apps[1]).post(
        '/api/v1/auth/security/2fa/generate',
      );
      expect(res.status).toBe(401);
    });
  });

  describe('2FA - /2fa/verify', () => {
    it('should return 409 if 2FA is verified', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/verify')
        .set('authorization', `Bearer ${TestContext.login2FA}`)
        .send({ otp: TestContext.otp });
      expect(res.status).toBe(409);
    });

    it('should return 409 if wrong OTP is provided', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/verify')
        .set('authorization', `Bearer ${TestContext.login2FA}`)
        .send({ otp: '123456' });
      expect(res.status).toBe(409);
    });

    it('should return 400 if OTP is too short', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/verify')
        .set('authorization', `Bearer ${TestContext.login2FA}`)
        .send({ otp: '1234' });
      expect(res.status).toBe(400);
    });

    it('should return 401 if user is not logged in', async () => {
      const res = await request(TestContext.apps[1])
        .post('/api/v1/auth/security/2fa/verify')
        .send({ otp: '123456' });
      expect(res.status).toBe(401);
    });
  });

  describe('Reset Password - /send-reset-password', () => {
    it('should return 200 or 500 if limit exceeded', async () => {
      const res = await request(TestContext.apps[0])
        .post('/api/v1/auth/security/send-reset-password')
        .send({ email: 'amr5179520@gmail.com' });

      expect([200, 500]).toContain(res.status);
    });

    it('should return 404 if email is not found', async () => {
      const res = await request(TestContext.apps[0])
        .post('/api/v1/auth/security/send-reset-password')
        .send({ email: 'amr5119520@gmail.com' });
      expect(res.status).toBe(404);
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(TestContext.apps[0]).post(
        '/api/v1/auth/security/send-reset-password',
      );
      expect(res.status).toBe(400);
    });

    it('should return 401 if account is blocked/deleted/unverified', async () => {
      const res = await request(TestContext.apps[0])
        .post('/api/v1/auth/security/send-reset-password')
        .send({ email: 'amr5129520@gmail.com' });
      expect(res.status).toBe(401);
    });

    Object.entries(invalidEmails).forEach(([key, { email, status }]) => {
      it(`should return ${status} for invalid email: ${key}`, async () => {
        const res = await request(TestContext.apps[1])
          .post('/api/v1/auth/security/send-reset-password')
          .send({ email });
        expect(res.status).toBe(status);
      });
    });
  });

  describe('Update Password - /update-password', () => {
    it('should return 200 if password is updated successfully', async () => {
      const res = await request(TestContext.apps[2])
        .post('/api/v1/auth/security/update-password')
        .set('authorization', `Bearer ${TestContext.tokens[2]}`)
        .send({
          password: passwordCases.valid,
          confirmPassword: passwordCases.valid,
        });
      expect(res.status).toBe(200);
    });

    Object.entries(passwordCases.cases).forEach(
      ([key, { password, status }]) => {
        it(`should return ${status} for invalid password: ${key}`, async () => {
          const res = await request(TestContext.apps[2])
            .post('/api/v1/auth/security/update-password')
            .set('authorization', `Bearer ${TestContext.tokens[2]}`)
            .send({
              password,
              confirmPassword: password,
            });
          expect(status).toContain(res.status);
        });
      },
    );

    it('should return 400 if password is missing', async () => {
      const res = await request(TestContext.apps[2])
        .post('/api/v1/auth/security/update-password')
        .set('authorization', `Bearer ${TestContext.tokens[2]}`)
        .send();
      expect(res.status).toBe(400);
    });

    it('should return 401 if user is not logged in', async () => {
      const res = await request(TestContext.apps[2])
        .post('/api/v1/auth/security/update-password')
        .send({
          password: passwordCases.valid,
          confirmPassword: passwordCases.valid,
        });
      expect(res.status).toBe(401);
    });
  });
});
