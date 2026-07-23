import { ResponseType } from '../types/response.type';

export class CustomError extends Error {
  statusCode: number;
  success: boolean;
  statusText: ResponseType;
  constructor(
    statusText: ResponseType,
    statusCode: number,
    message: string,
    success: boolean,
  ) {
    super(message);
    this.statusText = statusText;
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }
}
