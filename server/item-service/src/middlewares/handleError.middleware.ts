import { Request, Response, NextFunction } from "express";
import { ResponseOptions } from "../types/response.type";

type funcExpress = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;
type func = (...args: any[]) => Promise<ResponseOptions>;

export class HandleError {
  private static instance: HandleError;

  static getInstance() {
    if (!HandleError.instance) {
      HandleError.instance = new HandleError();
    }
    return HandleError.instance;
  }

  handleError = (func: funcExpress) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await (func as funcExpress)(req, res, next);
      } catch (err: any) {
        next(err);
      }
    };
  };

  errorMiddleware = () => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.stack,
      });
    };
  };

  warpError = <T extends func>(func: T): T => {
    return (async (
      ...args: Parameters<T>
    ): Promise<ResponseOptions<Awaited<ReturnType<T>>> | void> => {
      try {
        return await func(...args);
      } catch (error: any) {
        return {
          success: false,
          status: error.status || 500,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        };
      }
    }) as T;
  };
}
