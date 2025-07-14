import request from 'supertest';
import { Application } from 'express';
import { setupTestContext, TestContext } from '../helpers/setup';
import { RegisterEmailDto } from '../../src/dto/auth/register.dto';
import { OtpEmail } from '../../src/model/mongodb/auth/otp.model';
import {
  invalidRegisterEmail,
  validRegisterEmail,
} from '../__fixtures__/register.fixture';

let app: Application;
beforeAll(async () => {
  await setupTestContext();
  await OtpEmail.deleteMany();
  app = TestContext.apps[0];
});

describe('POST /api/v1/auth/register/email', () => {
  describe('Success Cases', () => {
    it('should return 200 when data is valid', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/email')
        .send(validRegisterEmail);
      expect(res.status).toBe(200);
    });

    it('should return 409 if email already exists', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/email')
        .send({ ...validRegisterEmail, email: 'amr5189520@gmail.com' });
      expect(res.status).toBe(409);
    });

    it('should return 400 if payload is empty', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/email')
        .send({});
      expect(res.status).toBe(400);
    });
  });

  describe('Missing Fields', () => {
    it.each(Object.keys(RegisterEmailDto.shape))(
      'should return 400 if %s is missing',
      async (field) => {
        const payload = { ...validRegisterEmail };
        delete payload[field as keyof typeof payload];
        const res = await request(app)
          .post('/api/v1/auth/register/email')
          .send(payload);
        expect(res.status).toBe(400);
      },
    );
  });

  describe('Invalid Field Values', () => {
    Object.entries(invalidRegisterEmail).forEach(([field, values]) => {
      values.forEach((value) => {
        it(`should return 400 if ${field} is invalid: ${JSON.stringify(
          value,
        )}`, async () => {
          const payload = { ...validRegisterEmail, [field]: value };
          const res = await request(app)
            .post('/api/v1/auth/register/email')
            .send(payload);
          expect(res.status).toBe(400);
        });
      });
    });
  });

  describe('Verify Email', () => {
    it('should return 400 if expired or the link has already been used', async () => {
      const res = await request(app)
        .post(
          `/api/v1/auth/verify-email/eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4ZGY2MmQzYTBhNDRlM2RmY2RjYWZjNmRhMTM4Mzc3NDU5ZjliMDEiLCJ0eXAiOiJKV1QifQ`,
        )
      expect(res.status).toBe(404);
    });
  });
});
