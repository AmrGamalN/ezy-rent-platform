import request from 'supertest';
import { Application } from 'express';
import { setupTestContext, TestContext } from '../helper/server';
import { RegisterPhoneDto } from '../../src/dto/auth/register.dto';
import {
  invalidRegisterPhone,
  validRegisterPhone,
} from '../__fixtures__/register.fixture';

describe('POST /api/v1/auth/register/phone', () => {
  let app: Application;

  beforeAll(async () => {
    await setupTestContext();
    app = TestContext.apps[0];
  });

  describe('Success Cases', () => {
    it('should return 200', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/phone')
        .send({ ...validRegisterPhone, terms: true });
      expect(res.status).toBe(200);
    });

    it('should return 409 if phone already exists', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/phone')
        .send({
          ...validRegisterPhone,
          terms: true,
          phoneNumber: '+201200812638',
        });
      expect(res.status).toBe(409);
    });

    it('should return 400 if payload is empty', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/phone')
        .send({});
      expect(res.status).toBe(400);
    });
  });

  describe('Missing Fields', () => {
    const fields = Object.keys(RegisterPhoneDto.shape);
    fields.forEach((field) => {
      const invalidPayload = { ...validRegisterPhone };
      delete invalidPayload[field as keyof typeof invalidPayload];
      it(`should return 400 if ${field} is missing`, async () => {
        const res = await request(app)
          .post('/api/v1/auth/register/phone')
          .send(invalidPayload);
        expect(res.status).toBe(400);
      });
    });
  });

  describe('Invalid Field Values', () => {
    Object.entries(invalidRegisterPhone).forEach(([index, values]) => {
      values.forEach((field) => {
        const payload = { ...validRegisterPhone, [index]: field };
        it(`should return 400 if ${index} is invalid: ${JSON.stringify(field)}`, async () => {
          const res = await request(app)
            .post('/api/v1/auth/register/phone')
            .send(payload);
          expect(res.status).toBe(400);
        });
      });
    });
  });
});
