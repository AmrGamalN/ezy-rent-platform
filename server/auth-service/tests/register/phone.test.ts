import request from 'supertest';
import { createTestApp } from '../helpers/createTestApp';
import loginRoutes from '../../src/routes/auth/register.route';
import { RegisterPhoneDto } from '../../src/dtos/auth/register.dto';
const app = createTestApp(loginRoutes, '/api/v1/auth/');

const vaildData = {
  phoneNumber: '+201200812674',
  password: 'Amr123456789@',
  username: 'amr gamal',
  confirmPassword: 'Amr123456789@',
};

const invalidData = {
  phone: [
    '201200812637',
    '',
    '#201200812637',
    'amr',
    123456789,
    '2012008126389',
    'amr123456789',
    '+20120081263',
  ],
  password: [
    '123',
    'password',
    'amr12345679@',
    'amr123456789',
    'amr12345@',
    '',
    'AMR123456789@',
    'Amr 123456789@',
  ],
  username: [
    '123456',
    '#$@!',
    123456789,
    false,
    '',
    'amr@#$',
    'amr_gamal',
    'am',
  ],
  confirmPassword: ['wrongPass123', 'notMatching', 'Amr123456789'],
  terms: [12346, '@#$%'],
};

describe('POST /api/v1/auth/register/phone', () => {
  it('should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register/phone')
      .send({ ...vaildData, terms: true });
    expect(res.status).toBe(200);
  });

  it('should return 409 if email already exists', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register/phone')
      .send({ ...vaildData, terms: true, phoneNumber: '+201200812638' });
    expect(res.status).toBe(409);
  });

  it('should return 400 if payload is empty', async () => {
    const res = await request(app).post('/api/v1/auth/register/phone').send({});
    expect(res.status).toBe(400);
  });
});

describe('POST /api/v1/auth/register/phone', () => {
  const fields = Object.keys(RegisterPhoneDto.shape);
  fields.forEach((field) => {
    const invalidPayload = { ...vaildData };
    delete invalidPayload[field as keyof typeof invalidPayload];
    it(`should return 400 if ${field} is missing`, async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/phone')
        .send(invalidPayload);
      expect(res.status).toBe(400);
    });
  });
});

describe('POST /api/v1/auth/register/phone', () => {
  Object.entries(invalidData).forEach(([index, values]) => {
    values.forEach((field) => {
      const payload = { ...vaildData, [index]: field };
      it(`should return 400 if ${index} is invalid`, async () => {
        const res = await request(app)
          .post('/api/v1/auth/register/phone')
          .send(payload);
        expect(res.status).toBe(400);
      });
    });
  });
});
