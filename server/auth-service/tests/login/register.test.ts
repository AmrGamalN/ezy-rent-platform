import request from 'supertest';
import { createTestApp } from '../helpers/createTestApp';
import loginRoutes from '../../src/routes/auth/register.route';
import { RegisterEmailDto } from '../../src/dtos/auth/register.dto';
import { OtpEmail } from '../../src/models/mongodb/auth/otp.model';
const app = createTestApp(loginRoutes, '/api/v1/auth/');

const vaildData = {
  email: 'amr5149520@gmail.com',
  password: 'Amr123456789@',
  username: 'amr gamal',
  confirmPassword: 'Amr123456789@',
};

const invalidData = {
  email: [
    'invalidemail',
    'amr#gmail.com',
    'amr123gmail.com',
    'amr123gmail',
    'amr123gmail.dcx',
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

beforeEach(async () => {
  await OtpEmail.deleteOne({ email: 'amr5149520@gmail.com' });
});

describe('POST /api/v1/auth/register/email', () => {
  it('should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register/email')
      .send({ ...vaildData, terms: true });
    expect(res.status).toBe(200);
  });
});

describe('POST /api/v1/auth/register/email', () => {
  const fields = Object.keys(RegisterEmailDto.shape);
  fields.forEach((field) => {
    const invalidPayload = { ...vaildData };
    delete invalidPayload[field as keyof typeof invalidPayload];
    it(`should return 400 if ${field} is missing`, async () => {
      const res = await request(app)
        .post('/api/v1/auth/register/email')
        .send(invalidPayload);
      expect(res.status).toBe(400);
    });
  });
});

describe('POST /api/v1/auth/register/email', () => {
  Object.entries(invalidData).forEach(([index, values]) => {
    values.forEach((field) => {
      const payload = { ...vaildData, [index]: field };
      it(`should return 400 if ${index} is invalid`, async () => {
        const res = await request(app)
          .post('/api/v1/auth/register/email')
          .send(payload);
        expect(res.status).toBe(400);
      });
    });
  });
});
