import request from 'supertest';
import { createTestApp } from '../helpers/createTestApp';
import loginRoutes from '../../src/routes/auth/login.route';
import { redis } from '../../src/configs/redis.config';

const app = createTestApp(loginRoutes, '/api/v1/auth/');

describe('POST /api/v1/auth/login/email', () => {
  const validEmail = 'amr5189520@gmail.com';
  const validPassword = 'Amr123456789@';

  describe('Successful login', () => {
    it('should return 200 and access token when credentials are correct', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: validEmail,
        password: validPassword,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(typeof res.body.accessToken).toBe('string');
      expect(res.body.accessToken).not.toBe('');
      expect(res.body.message).toBe('Login successful');
    });

    it('should return 200 and require 2FA if user has 2FA enabled', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'agencycar240@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe(
        'Two-factor authentication required, Please enter the code',
      );
    });
  });

  describe('Password validation failures', () => {
    it('should return 401 if password is missing special character', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: 'Amr123456789',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing uppercase letter', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: 'amr123456789@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing lowercase letter', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: 'AMR123456789@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing number', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: 'AmrPassword@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 400 if password is empty', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: '',
      });
      expect(res.status).toBe(400);
    });

    it('should return 401 if password is shorter than 10 characters', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'hossammohamed6401@gmail.com',
        password: 'Amr1234@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 and lock account after 3 failed attempts', async () => {
      for (let i = 0; i < 3; i++) {
        await request(app).post('/api/v1/auth/login/email').send({
          email: 'amrg3283@gmail.com',
          password: 'WrongPassword1@',
        });
      }
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'amrg3283@gmail.com',
        password: 'WrongPassword1@',
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(
        /Account locked due to multiple failed logins/i,
      );
    });
  });

  describe('Email validation failures', () => {
    it('should return 400 if email is missing "@" symbol', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'amr123456789gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if email domain is not supported', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'user@example.com',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if email does not end with .com', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'user@gmail.net',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if email contains invalid characters', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'amr$%123@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if email is empty', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: '',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 404 if email is not found in the database', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'notfounduser@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        'This email account you provided does not match our records',
      );
    });
  });

  describe('Account status validation', () => {
    it('should return 401 if account is blocked', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'jhossam818@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Account is blocked');
    });

    it('should return 401 if account is deleted', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'amr5179520@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Account is deleted');
    });

    it('should return 401 if account is not verified', async () => {
      const res = await request(app).post('/api/v1/auth/login/email').send({
        email: 'ezyrent.eg@gmail.com',
        password: validPassword,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Account is not verified');
    });
  });

  afterAll(async () => {
    await redis.quit();
  });
});
