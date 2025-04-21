import { Router, Request, Response } from 'express';
import authService from '../services/auth.service';
import { authenticate } from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const response = await authService.signUp(req.body);
    res.success(response.message, response.data, response.statusCode || 201);
  } catch (error: any) {
    res.error(error.message, error, 400);
  }
});

authRouter.post('/sign-in', async (req: Request, res: Response) => {
  try {
    const response = await authService.signIn(req.body);
    res.success(response.message, response.data, response.statusCode || 200);
  } catch (error: any) {
    res.error(error.message, error, 400);
  }
});

authRouter.post(
  '/sign-out',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId || '';
      const token = req.token;

      if (!token) {
        return res.error('Token is required', undefined, 400);
      }

      const response = await authService.signOut(userId, token);
      res.success(response.message, response.data, response.statusCode || 200);
    } catch (error: any) {
      res.error(error.message, error, 400);
    }
  }
);

export default authRouter;
