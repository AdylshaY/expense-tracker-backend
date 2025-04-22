import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils';
import { isValidToken } from '../utils/token.utils';
import { USER_ROLES, UserRole } from '../constants/roles';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
      token?: string;
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token from the Authorization header and checks if token is valid and not expired
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

    const isValid = await isValidToken(token);

    if (!isValid) {
      return res.error('Invalid or expired token', undefined, 401);
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
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

/**
 * Role-based authorization middleware
 * Allows access only to users with specified roles
 */
export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.error('User not authenticated', undefined, 401);
      }

      const { role } = req.user;

      if (!allowedRoles.includes(role as UserRole)) {
        return res.error('Unauthorized - Insufficient permissions', undefined, 403);
      }

      next();
    } catch (error) {
      if (error instanceof Error) {
        return res.error(error.message, undefined, 403);
      }

      return res.error(
        'Internal server error during authorization',
        undefined,
        500
      );
    }
  };
};

/**
 * Admin-only middleware
 * Shorthand for authorize([USER_ROLES.ADMIN])
 */
export const adminOnly = authorize([USER_ROLES.ADMIN]);
