// tests/util/sendEmail.test.ts
import request from 'supertest';
import express, { Request, Response } from 'express';
import * as emailUtil from '../../src/util/sendEmail.util';

describe('Send Email Test', () => {
  const app = express();
  app.use(express.json());

  app.post('/send-email', async (req: Request, res: Response) => {
    try {
      const result = await emailUtil.sendEmail(
        req.body.email,
        'Hello world',
        'test',
      );
      if (result.status === 400) res.status(400).json(result);
      else res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', err: error });
    }
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 200 when email sent successfully', async () => {
    jest
      .spyOn(emailUtil, 'sendEmail')
      .mockResolvedValue({ status: 200, message: 'Sent!' });

    const res = await request(app)
      .post('/send-email')
      .send({ email: 'amr5189520@gmail.com' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 200, message: 'Sent!' });
  });

  it('should return 400 when email sending fails with bad request', async () => {
    jest
      .spyOn(emailUtil, 'sendEmail')
      .mockResolvedValue({ status: 400, message: 'Invalid email' });

    const res = await request(app)
      .post('/send-email')
      .send({ email: 'bad-email' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ status: 400, message: 'Invalid email' });
  });

  it('should return 500 when sendEmail throws error', async () => {
    jest
      .spyOn(emailUtil, 'sendEmail')
      .mockRejectedValue(new Error('SMTP failed'));

    const res = await request(app).post('/send-email').send({});

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});
