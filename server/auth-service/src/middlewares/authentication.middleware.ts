import { NextFunction, Request, Response } from 'express';
import { CustomError, HandleError } from '@amrogamal/shared-code';
import { auth } from '../configs/firebase.config';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { decrypt } from '../utils/encrypt.util';
import { UserToken } from '../types/request.type';
import { FirebaseOAuthUser, FirebasePhoneUser } from '../types/firebase.type';
const { handleError } = HandleError.getInstance();
dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    curUser?: UserToken;
    email?: string;
    decode?: FirebaseOAuthUser | FirebasePhoneUser;
  }
}

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

  verify2FATempToken = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const token = req.cookies?.tempToken;
    const decoded = jwt.verify(decrypt(token), String(process.env.JWT_SECRET), {
      algorithms: ['HS256'],
    });
    if (!decoded)
      throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
    req.email = decrypt(decoded as string);
    return next();
  };

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
        role: 'user',
        userId: decoded.uid,
        lastLogin: new Date().toISOString(),
      } as UserToken;
      return next();
    },
  );

  verifyFirebaseToken = handleError(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      if (!token)
        throw new CustomError('Unauthorized', 401, 'Unauthorized', false);
      const decoded = await auth.verifyIdToken(token);
      req.curUser = {
        ...decoded,
        role: decoded.role,
        userId: decoded.userId,
        lastLogin: new Date().toISOString(),
      } as UserToken;
      return next();
    },
  );
}
