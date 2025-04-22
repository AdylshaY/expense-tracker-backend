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
