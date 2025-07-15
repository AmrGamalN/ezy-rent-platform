import request from 'supertest';
import { Application } from 'express';
import { setupTestContext, TestContext } from '../helper/server';
import {
  invalidPhones,
  passwordCases,
  phoneCases,
  validPhone,
} from '../__fixtures__/login.fixture';

let app: Application;
beforeAll(async () => {
  await setupTestContext();
  app = TestContext.apps[0];
});

describe('POST /api/v1/auth/login/phone', () => {
  describe('Success Cases', () => {
    it('should return 200 when valid phone and password', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: validPhone.phoneNumber,
        password: passwordCases.valid,
      });
      expect(res.status).toBe(validPhone.status);
    });

    it('should return 200 when valid phone with space and password', async () => {
      const res = await request(app).post('/api/v1/auth/login/phone').send({
        phoneNumber: '+20 120 081 2638',
        password: passwordCases.valid,
      });
      expect(res.status).toBe(validPhone.status);
    });
  });

  describe('Phone Status Failures (blocked, deleted, etc)', () => {
    Object.entries(phoneCases).forEach(([key, { phoneNumber, status }]) => {
      it(`should return ${status} for phone status case: ${key}`, async () => {
        const res = await request(app).post('/api/v1/auth/login/phone').send({
          phoneNumber,
          password: passwordCases.valid,
        });
        expect(res.status).toBe(status);
      });
    });
  });

  describe('Invalid Phone Format', () => {
    Object.entries(invalidPhones).forEach(([key, { phoneNumber, status }]) => {
      it(`should return ${status} for invalid phone format: ${key}`, async () => {
        const res = await request(app).post('/api/v1/auth/login/phone').send({
          phoneNumber,
          password: passwordCases.valid,
        });
        expect(res.status).toBe(status);
      });
    });
  });
});
