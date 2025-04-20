import { Budget } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { BudgetViewModel } from '../types/budget.types';

class BudgetService {
  async getAllBudgetsByUserId(userId: number): Promise<BudgetViewModel[]> {
    const budgets = await prisma.budget.findMany({
      where: { USER_ID: userId },
    });

    return budgets.map((budget) => ({
      id: budget.ID,
      name: budget.NAME,
      description: budget.DESCRIPTION,
      balance: budget.BALANCE,
      userId: budget.USER_ID,
    }));
  }

  async getBudget(id: number, userId: number): Promise<BudgetViewModel> {
    const budget = await prisma.budget.findUnique({
      where: { ID: id, USER_ID: userId },
    });

    if (!budget) {
      throw new Error('Budget not found');
    }

    return {
      id: budget.ID,
      name: budget.NAME,
      description: budget.DESCRIPTION,
      balance: budget.BALANCE,
      userId: budget.USER_ID,
    };
  }

  async createBudget(budget: BudgetViewModel, userId: number): Promise<Budget> {
    const newBudget = await prisma.budget.create({
      data: {
        NAME: budget.name,
        BALANCE: budget.balance,
        USER_ID: userId,
        DESCRIPTION: budget.description,
      },
    });

    return newBudget;
  }

  async updateBudget(
    id: number,
    budget: BudgetViewModel,
    userId: number
  ): Promise<Budget> {
    const updatedBudget = await prisma.budget.update({
      where: { ID: id, USER_ID: userId },
      data: {
        NAME: budget.name,
        BALANCE: budget.balance,
        USER_ID: userId,
        DESCRIPTION: budget.description,
      },
    });

    return updatedBudget;
  }

  async deleteBudget(id: number, userId: number): Promise<Budget> {
    const deletedBudget = await prisma.budget.delete({
      where: { ID: id, USER_ID: userId },
    });

    return deletedBudget;
  }
}

export default new BudgetService();
