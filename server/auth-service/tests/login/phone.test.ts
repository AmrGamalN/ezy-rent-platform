import request from 'supertest';
import { createTestApp } from '../helpers/createTestApp';
import loginRoutes from '../../src/routes/auth/login.route';
import { redis } from '../../src/configs/redis.config';

const app = createTestApp(loginRoutes, '/api/v1/auth/');

describe('POST /api/v1/auth/login/phone', () => {
  const validphoneNumber = '+201200812638';
  const validPassword = 'Amr123456789@';

  describe('Successful login', () => {
    it('should return 200 and access token when credentials are correct', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: validphoneNumber,
        password: validPassword,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(typeof res.body.accessToken).toBe('string');
      expect(res.body.accessToken).not.toBe('');
      expect(res.body.message).toBe('Login successful');
    });

    it('should return 200 and require 2FA if user has 2FA enabled', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812637',
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
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812636',
        password: 'Amr123456789',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing uppercase letter', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812636',
        password: 'amr123456789@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing lowercase letter', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812636',
        password: 'AMR123456789@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is missing number', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812636',
        password: 'AmrPassword@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 400 if password is empty', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812630',
        password: '',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password is shorter than 10 characters', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812636',
        password: 'Amr1234@',
      });
      expect(res.status).toBe(401);
    });

    it('should return 401 and lock account after 3 failed attempts', async () => {
      for (let i = 0; i < 3; i++) {
        await request(app).post('/api/v1/auth/login/phone').send({
          phoneNumber: '+201200812635',
          password: 'WrongPassword1@',
        });
      }
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812635',
        password: 'WrongPassword1@',
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(
        /Account locked due to multiple failed logins/i,
      );
    });
  });

  describe('Phone validation failures', () => {
    it('should return 400 if phone number is missing "+" symbol', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '201200812634',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if phone number invalid [ 1200812634 ] format', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '1200812634',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if phone number invalid [ @201200812634 ] format', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '@201200812634',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if phone number invalid [201200812634#] format', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '201200812634#',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if phone number invalid [2012008K12634] format', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '2012008K12634',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 400 if phone number is empty', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '',
        password: validPassword,
      });
      expect(res.status).toBe(400);
    });

    it('should return 404 if phone number is not found in the database', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812600',
        password: validPassword,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        'This phone number you provided does not match our records',
      );
    });
  });

  describe('Account status validation', () => {
    it('should return 401 if account is blocked', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812633',
        password: validPassword,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Account is blocked');
    });

    it('should return 401 if account is deleted', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812632',
        password: validPassword,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Account is deleted');
    });

    it('should return 401 if account is not verified', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+201200812631',
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
