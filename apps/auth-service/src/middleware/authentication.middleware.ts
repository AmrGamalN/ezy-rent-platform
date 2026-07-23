import type { NextFunction, Request, Response } from 'express';
import { CustomError, HandleError } from '@amrogamal/shared-code';
import jwt from 'jsonwebtoken';
import { decrypt } from '../util/encrypt.util';
import { UserToken } from '../types/request.type';
import { redis } from '../config/redis.config';
import config from '../config/env.config';
const { handleError } = HandleError.getInstance();

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  authorization = (role: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.curUser?.role)
        throw new CustomError('FORBIDDEN', 403, 'Access denied', false);

      if (!role.includes(req.curUser?.role))
        throw new CustomError('FORBIDDEN', 403, 'Access denied', false);
      return next();
    };
  };

  verify2FATempToken = handleError(
    (req: Request, res: Response, next: NextFunction): void => {
      const token = req.cookies?.tempToken;
      if (!token)
        throw new CustomError(
          'UNAUTHORIZED',
          401,
          'Invalid token expired, please try again',
          false,
        );

      const decrypted = decrypt(token) as string;
      const decoded = jwt.verify(decrypted, config.jwt.secret, {
        algorithms: ['HS256'],
      });
      if (!decoded)
        throw new CustomError('UNAUTHORIZED', 401, 'UNAUTHORIZED', false);
      (req as Request & { email: string }).email = (
        decoded as { email: string }
      ).email;
      return next();
    },
  );

  verifyFirebaseProvider = handleError(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
      const token = req.body.IdToken;
      if (!token)
        throw new CustomError('UNAUTHORIZED', 401, 'UNAUTHORIZED', false);
      const decoded = await jwt.verify(token, config.jwt.secret);
      req.curUser = decoded as UserToken;
      return next();
    },
  );

  verifyToken = handleError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const sessionId = req.cookies.SID;
      if (!sessionId)
        throw new CustomError('UNAUTHORIZED', 401, 'UNAUTHORIZED', false);

      const sessionData = await redis.get(`session:${sessionId}`);
      if (!sessionData)
        throw new CustomError('UNAUTHORIZED', 401, 'Session expired', false);

      const session = JSON.parse(sessionData);
      const { accessToken, refreshToken, userId } = session;

      try {
        const decoded = jwt.verify(accessToken, config.jwt.secret);
        req.curUser = decoded as UserToken;
        return next();
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        if (error.name === 'TokenExpiredError' && refreshToken) {
          try {
            const decoded = jwt.verify(
              refreshToken,
              config.jwt.secret,
            ) as UserToken;

            const newAccessToken = jwt.sign(
              { userId, email: decoded.email, role: decoded.role },
              config.jwt.secret,
              { expiresIn: '1h' },
            );

            await redis.setEx(
              `session:${sessionId}`,
              60 * 60 * 24 * 14,
              JSON.stringify({
                ...session,
                accessToken: newAccessToken,
                updatedAt: new Date().toISOString(),
              }),
            );

            req.curUser = jwt.decode(newAccessToken) as UserToken;
            return next();
            /* eslint-disable @typescript-eslint/no-explicit-any */
          } catch (refreshError: any) {
            if (refreshError.name === 'TokenExpiredError')
              throw new CustomError(
                'UNAUTHORIZED',
                401,
                'Refresh token expired',
                false,
              );
            throw new CustomError('UNAUTHORIZED', 401, 'Invalid token', false);
          }
        }
        throw new CustomError('UNAUTHORIZED', 401, 'Invalid token', false);
      }
    },
  );
}
