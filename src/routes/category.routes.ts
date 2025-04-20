import { Router, Request, Response } from 'express';
import categoryService from '../services/category.service';
import { authenticate } from '../middleware/auth.middleware';

const categoryRouter = Router();

categoryRouter.use(authenticate);

categoryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const categories = await categoryService.getAllCategoriesByUserId(
      parseInt(userId)
    );

    res.success('Categories fetched successfully', categories, 200);
  } catch (error: any) {
    res.error('Failed to fetch categories', error.message, 500);
  }
});

categoryRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const category = await categoryService.getCategory(
      parseInt(req.params.id),
      parseInt(userId)
    );
    res.success('Category fetched successfully', category, 200);
  } catch (error: any) {
    res.error('Failed to fetch category', error.message, 500);
  }
});

categoryRouter.post('/', async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.success('Category created successfully', category, 201);
  } catch (error: any) {
    res.error('Failed to create category', error.message, 500);
  }
});

categoryRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const category = await categoryService.updateCategory(
      parseInt(req.params.id),
      req.body,
      parseInt(userId)
    );
    res.success('Category updated successfully', category, 200);
  } catch (error: any) {
    res.error('Failed to update category', error.message, 500);
  }
});

categoryRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const category = await categoryService.deleteCategory(
      parseInt(req.params.id),
      parseInt(userId)
    );
    res.success('Category deleted successfully', category, 200);
  } catch (error: any) {
    res.error('Failed to delete category', error.message, 500);
  }
});

export default categoryRouter;
