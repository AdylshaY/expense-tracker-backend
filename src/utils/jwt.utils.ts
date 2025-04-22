import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: string;
}

/**
 * Generate JWT tokens for authentication
 */
export const generateTokens = (payload: TokenPayload): TokenResponse => {
  const accessToken = jwt.sign(
    payload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN } as SignOptions
  );

  return {
    accessToken,
    expiresIn: JWT_EXPIRES_IN,
  };
};

/**
 * Verify JWT access token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET as jwt.Secret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

/**
 * Convert a time string like '15m', '1h', '7d' to milliseconds
 */
export const timeToMs = (timeStr: string): number => {
  const unit = timeStr.charAt(timeStr.length - 1);
  const value = parseInt(timeStr.slice(0, -1));

  switch (unit) {
    case 's':
      return value * 1000; // seconds
    case 'm':
      return value * 60 * 1000; // minutes
    case 'h':
      return value * 60 * 60 * 1000; // hours
    case 'd':
      return value * 24 * 60 * 60 * 1000; // days
    default:
      return 15 * 60 * 1000; // default to 15 minutes if format is incorrect
  }
};
