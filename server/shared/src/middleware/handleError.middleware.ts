import { Request, Response, NextFunction } from 'express';
import { ResponseOptions } from '../types/response.type';
import { logger } from '../configs/winston.config';
import { CustomError } from '../utils/customError.util';

type funcExpress = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | void> | void;
type func = (...args: any[]) => Promise<ResponseOptions | void>;

export class HandleError {
  private static instance: HandleError;

  static getInstance(): HandleError {
    if (!HandleError.instance) {
      HandleError.instance = new HandleError();
    }
    return HandleError.instance;
  }

  handleError = (func: funcExpress) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
      try {
        return await (func as funcExpress)(req, res, next);
      } catch (err: unknown) {
        if (err instanceof Error) {
          logger.error(`Error: ${err.message} - ${func.name} - ${err.stack}`);
          next(err);
        }
        return res.status(500).json({
          success: false,
          status: 500,
          message: 'Internal Server Error',
        });
      }
    };
  };

  errorMiddleware = () => {
    return (err: unknown, req: Request, res: Response): void => {
      if (err instanceof Error) {
        logger.error(`${req.method} ${req.url} - ${err.message}`);
        res.status(500).json({
          success: false,
          message: err.message || 'Internal Server Error',
          error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    };
  };

  warpError = <T extends func>(func: T): T => {
    return (async (
      ...args: Parameters<T>
    ): Promise<ResponseOptions<Awaited<ReturnType<T>>> | void> => {
      try {
        return await func(...args);
      } catch (error) {
        if (error instanceof Error || error instanceof CustomError) {
          logger.error(
            `Error: ${error.message} - ${func.name} - ${error.stack}`,
          );
          return {
            success: false,
            status: 500,
            message:
              error instanceof Error ? error.message : 'Internal Server Error',
          };
        }
        return {
          success: false,
          status: 500,
          message: 'Internal Server Error',
        };
      }
    }) as T;
  };
}
