import { Router, Request, Response } from 'express';

import { authenticate } from '../middleware/auth.middleware';
import transactionService from '../services/transaction.service';
const transactionRouter = Router();

transactionRouter.use(authenticate);

transactionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const transactions = await transactionService.getAllTransactionsByUserId(
      parseInt(userId)
    );

    res.success('Transactions fetched successfully', transactions, 200);
  } catch (error: any) {
    res.error('Failed to fetch transactions', error.message, 500);
  }
});

transactionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const transaction = await transactionService.getTransactionById(
      parseInt(req.params.id),
      parseInt(userId)
    );

    res.success('Transaction fetched successfully', transaction, 200);
  } catch (error: any) {
    res.error('Failed to fetch transaction', error.message, 500);
  }
});

transactionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);

    res.success('Transaction created successfully', transaction, 201);
  } catch (error: any) {
    res.error('Failed to create transaction', error.message, 500);
  }
});

transactionRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const transaction = await transactionService.updateTransaction(
      req.body,
      parseInt(userId)
    );

    res.success('Transaction updated successfully', transaction, 200);
  } catch (error: any) {
    res.error('Failed to update transaction', error.message, 500);
  }
});

transactionRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    await transactionService.deleteTransaction(
      parseInt(req.params.id),
      parseInt(userId)
    );

    res.success('Transaction deleted successfully', null, 200);
  } catch (error: any) {
    res.error('Failed to delete transaction', error.message, 500);
  }
});

export default transactionRouter;
