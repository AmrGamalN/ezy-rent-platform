import request from 'supertest';
import { Application } from 'express';
import { setupTestContext, TestContext } from '../helper/server';
import {
  emailCases,
  invalidEmails,
  passwordCases,
} from '../__fixtures__/login.fixture';

let app: Application;
beforeAll(async () => {
  await setupTestContext();
  app = TestContext.apps[0];
});

describe('POST /api/v1/auth/login/email', () => {
  describe('Success Cases', () => {
    Object.entries(emailCases).forEach(([key, { email, status }]) => {
      if (status === 200) {
        it(`should return ${status} for email case: ${key}`, async () => {
          const res = await request(app)
            .post('/api/v1/auth/login/email')
            .send({ email, password: passwordCases.valid });

          expect(res.status).toBe(status);
        });
      }
    });
  });

  describe('Password Validation Failures', () => {
    Object.entries(passwordCases.cases).forEach(
      ([key, { password, status }]) => {
        it(`should return ${status} for password case: ${key}`, async () => {
          const res = await request(app)
            .post('/api/v1/auth/login/email')
            .send({ email: 'hossammohamed6401@gmail.com', password });
          expect(status).toContain(res.status);
        });
      },
    );

    it('should return 401 and lock account after 3 failed attempts', async () => {
      const email = 'amrg3283@gmail.com';
      const password = 'WrongPassword1@';

      for (let i = 0; i < 3; i++) {
        await request(app)
          .post('/api/v1/auth/login/email')
          .send({ email, password });
      }

      const res = await request(app)
        .post('/api/v1/auth/login/email')
        .send({ email, password });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(
        /Account locked due to multiple failed logins/i,
      );
    });
  });

  describe('Email Format Validation Failures', () => {
    Object.entries(invalidEmails).forEach(([key, { email, status }]) => {
      it(`should return ${status} for invalid email: [${key}]`, async () => {
        const res = await request(app)
          .post('/api/v1/auth/login/email')
          .send({ email, password: passwordCases.valid });

        expect(res.status).toBe(status);
      });
    });
  });

  describe('Account Status Failures (blocked, deleted, etc)', () => {
    Object.entries(emailCases).forEach(([key, { email, status }]) => {
      if (status !== 200) {
        it(`should return ${status} for email status case: ${key}`, async () => {
          const res = await request(app)
            .post('/api/v1/auth/login/email')
            .send({ email, password: passwordCases.valid });
          expect(res.status).toBe(status);
        });
      }
    });
  });
});
