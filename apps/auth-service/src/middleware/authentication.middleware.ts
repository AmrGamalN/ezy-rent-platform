import type { NextFunction, Request, Response } from 'express';
import { CustomError, HandleError } from '@amrogamal/shared-code';
import { auth } from '../config/firebase.config';
import jwt from 'jsonwebtoken';
import { decrypt } from '../util/encrypt.util';
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
        throw new CustomError('Forbidden', 403, 'Access denied', false);

      if (!role.includes(req.curUser?.role))
        throw new CustomError('Forbidden', 403, 'Access denied', false);
      return next();
    };
  };

  checkStatus = handleError(
    (req: Request, res: Response, next: NextFunction): void => {
      const user = req.curUser;
      const status =
        !user?.isEmailVerified &&
        user?.sign_up_provider === 'email' &&
        'Account is not verified';
      if (status)
        throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
      return next();
    },
  );

  verify2FATempToken = handleError(
    (req: Request, res: Response, next: NextFunction): void => {
      const token = req.cookies?.tempToken;
      if (!token)
        throw new CustomError(
          'Unauthorized',
          401,
          'Invalid token expired, please try again',
          false,
        );

      const decrypted = decrypt(token) as string;
      const decoded = jwt.verify(decrypted, String(process.env.JWT_SECRET), {
        algorithms: ['HS256'],
      });
      if (!decoded)
        throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
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
        throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
      const decoded = await auth.verifyIdToken(token);
      req.curUser = {
        ...decoded,
        email: decoded.email ?? '',
        role: 'user',
        userId: decoded.uid,
        lastSeen: new Date(),
      };
      return next();
    },
  );

  verifyFirebaseToken = handleError(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        if (!token)
          throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
        // const decrypted = decrypt(token) as string;
        const decoded = await auth.verifyIdToken(token);
        if (!decoded)
          throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
        req.curUser = {
          ...decoded,
          email: decoded.email ?? '',
          role: decoded.role,
          userId: decoded.userId,
          lastSeen: new Date(),
        };
        return next();
      } catch {
        throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
      }
    },
  );
}
