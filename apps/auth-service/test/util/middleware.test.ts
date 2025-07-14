import { AuthMiddleware } from '../../src/middleware/authentication.middleware';
import request from 'supertest';
const middlware = AuthMiddleware.getInstance();
import express, { Request, Response, NextFunction } from 'express';

describe('Authentication Middleware', () => {
  const app = express();
  app.use(express.json());
  app.get(
    '/admin-only',
    (req: Request, res: Response, next: NextFunction) => {
      req.curUser = req.body.curUser;
      next();
    },
    middlware.authorization(['admin']),
    (req, res) => {
      res.status(200).json({ message: 'Welcome, admin!' });
    },
  );

  describe('authorization middleware', () => {
    it('should return 403 if curUser is missing', async () => {
      const res = await request(app).get('/admin-only').send({});
      expect(res.status).toBe(403);
    });

    it('should return 403 if role is not allowed', async () => {
      const res = await request(app)
        .get('/admin-only')
        .send({
          curUser: { role: 'user' },
        });
      expect(res.status).toBe(403);
    });

    it('should pass if role is allowed', async () => {
      const res = await request(app)
        .get('/admin-only')
        .send({
          curUser: { role: 'admin' },
        });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Welcome, admin!');
    });
  });
});
