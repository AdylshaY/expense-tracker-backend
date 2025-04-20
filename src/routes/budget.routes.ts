import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import BudgetService from '../services/budget.service';

const budgetRouter = Router();

budgetRouter.use(authenticate);

budgetRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const budgets = await BudgetService.getAllBudgetsByUserId(parseInt(userId));
    res.success('Budgets fetched successfully', budgets, 200);
  } catch (error: any) {
    res.error('Failed to fetch budgets', error.message, 500);
  }
});

budgetRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const budgetId = req.params.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const budget = await BudgetService.getBudget(
      parseInt(budgetId),
      parseInt(userId)
    );
    res.success('Budget fetched successfully', budget, 200);
  } catch (error: any) {
    res.error('Failed to fetch budget', error.message, 500);
  }
});

budgetRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const budget = req.body;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const newBudget = await BudgetService.createBudget(
      budget,
      parseInt(userId)
    );
    res.success('Budget created successfully', newBudget, 201);
  } catch (error: any) {
    res.error('Failed to create budget', error.message, 500);
  }
});

budgetRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const budgetId = req.params.id;
    const budget = req.body;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const updatedBudget = await BudgetService.updateBudget(
      parseInt(budgetId),
      budget,
      parseInt(userId)
    );
    res.success('Budget updated successfully', updatedBudget, 200);
  } catch (error: any) {
    res.error('Failed to update budget', error.message, 500);
  }
});

budgetRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const budgetId = req.params.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const deletedBudget = await BudgetService.deleteBudget(
      parseInt(budgetId),
      parseInt(userId)
    );
    res.success('Budget deleted successfully', deletedBudget, 200);
  } catch (error: any) {
    res.error('Failed to delete budget', error.message, 500);
  }
});

export default budgetRouter;
