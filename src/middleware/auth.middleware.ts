import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token from the Authorization header
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.error('Authorization header is missing', undefined, 401);
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.error(
        'Authorization header format must be "Bearer {token}"',
        undefined,
        401
      );
    }

    const token = parts[1];

    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.error(error.message, undefined, 500);
    }

    return res.error(
      'Internal server error during authentication',
      undefined,
      500
    );
  }
};
