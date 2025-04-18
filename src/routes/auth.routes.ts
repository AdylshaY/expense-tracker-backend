import { Router, Request, Response } from 'express';
import authService from '../services/auth.service';
import { authenticate } from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const response = await authService.signUp(req.body);
    res.success(response.message, response.data, 201);
  } catch (error: any) {
    res.error(error.message);
  }
});

authRouter.post('/sign-in', async (req: Request, res: Response) => {
  try {
    const response = await authService.signIn(req.body);
    res.success(
      response.message,
      {
        ...response.data,
        token: response.token,
      },
      200
    );
  } catch (error: any) {
    res.error(error.message);
  }
});

authRouter.post(
  '/sign-out',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId || '';
      const response = await authService.signOut(userId);
      res.success(response.message, response.data, 200);
    } catch (error: any) {
      res.error(error.message);
    }
  }
);

export default authRouter;
