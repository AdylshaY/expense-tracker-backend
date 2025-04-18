import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const PORT = process.env.PORT || '3000';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET =
  process.env.JWT_SECRET || 'your-default-secret-key-for-development';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
