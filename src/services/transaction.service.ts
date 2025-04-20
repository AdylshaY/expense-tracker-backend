import { prisma } from '../lib/prisma';
import { TransactionViewModel } from '../types/transaction.types';

class TransactionService {
  async getAllTransactionsByUserId(
    userId: number
  ): Promise<TransactionViewModel[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        BUDGET: {
          USER_ID: userId,
        },
      },
      include: {
        CATEGORY: true,
      },
    });

    return transactions.map((transaction) => ({
      id: transaction.ID,
      name: transaction.NAME,
      description: transaction.DESCRIPTION,
      amount: transaction.AMOUNT,
      type: transaction.TYPE,
      date: transaction.DATE,
      budgetId: transaction.BUDGET_ID,
      categoryId: transaction.CATEGORY?.ID ?? null,
    }));
  }

  async getTransactionById(
    id: number,
    userId: number
  ): Promise<TransactionViewModel | null> {
    const transaction = await prisma.transaction.findUnique({
      where: { ID: id, BUDGET: { USER_ID: userId } },
      include: {
        CATEGORY: true,
        BUDGET: true,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return {
      id: transaction.ID,
      name: transaction.NAME,
      description: transaction.DESCRIPTION,
      amount: transaction.AMOUNT,
      type: transaction.TYPE,
      date: transaction.DATE,
      budgetId: transaction.BUDGET_ID,
      categoryId: transaction.CATEGORY?.ID ?? null,
    };
  }

  async createTransaction(transaction: TransactionViewModel, userId: number) {
    const budget = await prisma.budget.findUnique({
      where: { ID: transaction.budgetId, USER_ID: userId },
    });

    if (!budget) {
      throw new Error('Budget not found');
    }

    const createdTransaction = await prisma.transaction.create({
      data: {
        NAME: transaction.name,
        DESCRIPTION: transaction.description,
        AMOUNT: transaction.amount,
        TYPE: transaction.type,
        DATE: transaction.date,
        BUDGET_ID: budget.ID,
        CATEGORY_ID: transaction.categoryId ?? null,
      },
    });

    return createdTransaction;
  }

  async updateTransaction(transaction: TransactionViewModel, userId: number) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { ID: transaction.id, BUDGET: { USER_ID: userId } },
    });

    if (!existingTransaction) {
      throw new Error('Transaction not found');
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { ID: transaction.id, BUDGET: { USER_ID: userId } },
      data: {
        NAME: transaction.name,
        DESCRIPTION: transaction.description,
        AMOUNT: transaction.amount,
        TYPE: transaction.type,
        DATE: transaction.date,
        BUDGET_ID: transaction.budgetId,
        CATEGORY_ID: transaction.categoryId ?? null,
      },
    });

    return updatedTransaction;
  }

  async deleteTransaction(id: number, userId: number) {
    const transaction = await prisma.transaction.findUnique({
      where: { ID: id, BUDGET: { USER_ID: userId } },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    await prisma.transaction.delete({
      where: { ID: id, BUDGET: { USER_ID: userId } },
    });
  }
}

export default new TransactionService();
