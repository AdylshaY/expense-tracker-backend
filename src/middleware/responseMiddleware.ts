import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '../lib/response';

declare global {
  namespace Express {
    interface Response {
      success: <T>(message: string, data?: T, statusCode?: number) => Response;
      error: (
        message: string,
        error?: string | Record<string, unknown>,
        statusCode?: number
      ) => Response;
    }
  }
}

/**
 * Middleware that extends Express Response object with custom response methods
 */
export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.success = function <T>(
    message: string,
    data?: T,
    statusCode: number = 200
  ) {
    const responseObj = successResponse(
      message,
      _req.originalUrl,
      data,
      statusCode
    );
    return this.status(statusCode).json(responseObj);
  };

  res.error = function (
    message: string,
    error?: string | Record<string, unknown>,
    statusCode: number = 400
  ) {
    const responseObj = errorResponse(
      message,
      _req.originalUrl,
      error,
      statusCode
    );
    return this.status(statusCode).json(responseObj);
  };

  next();
};
