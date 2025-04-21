import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils';
import { isTokenBlacklisted } from '../utils/token.utils';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
      token?: string;
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token from the Authorization header and checks if token is blacklisted
 */
export const authenticate = async (
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

    const blacklisted = await isTokenBlacklisted(token);

    if (blacklisted) {
      return res.error('Token has been invalidated', undefined, 401);
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.error(error.message, undefined, 401);
    }

    return res.error(
      'Internal server error during authentication',
      undefined,
      500
    );
  }
};
