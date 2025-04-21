import { Router, Request, Response } from 'express';
import UserService from '../services/user.service';
import { authenticate } from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await UserService.getUser(
      parseInt(req.params.id),
      parseInt(userId)
    );
    res.success('User fetched successfully', user, 200);
  } catch (error: any) {
    res.error('Failed to fetch user', error.message, 500);
  }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await UserService.updateUser(
      parseInt(req.params.id),
      req.body,
      parseInt(userId)
    );
    res.success('User updated successfully', user, 200);
  } catch (error: any) {
    res.error('Failed to update user', error.message, 500);
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    await UserService.deleteUser(parseInt(req.params.id), parseInt(userId));
    res.success('User deleted successfully', null, 200);
  } catch (error: any) {
    res.error('Failed to delete user', error.message, 500);
  }
});

export default userRouter;
