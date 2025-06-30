import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError.util";
import { HandleError } from "./handleError.middleware";
import { auth } from "../configs/firebase.config";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { decrypt } from "../utils/encrypt.util";
const { handleError } = HandleError.getInstance();
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    curUser?: any;
  }
}

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  authorization = (role: string[]) => {
    return (req: any, res: any, next: any) => {
      if (!req.curUser?.role)
        throw new CustomError("Forbidden", 403, "Access denied", false);

      if (!role.includes(req.curUser?.role))
        throw new CustomError("Forbidden", 403, "Access denied", false);
      return next();
    };
  };


  verifyFirebaseProvider = handleError(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const token = req.body.IdToken;
      if (!token)
        throw new CustomError("Unauthorized", 401, "Unauthorized", false);
      const decoded = await auth.verifyIdToken(token);
      req.curUser = decoded;
      return next();
    }
  );

  verifyFirebaseToken = handleError(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];
      if (!token)
        throw new CustomError("Unauthorized", 401, "Unauthorized", false);
      const decoded = await auth.verifyIdToken(token);
      req.curUser = decoded;
      return next();
    }
  );
}
