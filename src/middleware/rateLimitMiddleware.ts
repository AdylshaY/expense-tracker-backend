import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

/**
 * Creates a rate limiter handler that works with the custom response middleware
 */
const createLimiterHandler = (message: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.error) {
      return res.error('Rate limit exceeded', message, 429);
    }
    return res.status(429).json({
      status: 'error',
      message: message,
    });
  };
};

/**
 * Default rate limiter that applies to all routes
 */
export const defaultRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  headers: true,
  message: 'Too many requests from this IP, please try again later',
  handler: createLimiterHandler(
    'Too many requests from this IP, please try again later'
  ),
});
