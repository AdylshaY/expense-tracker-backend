import { Category } from '@prisma/client';
import { CategoryViewModel } from '../types/category.types';
import { prisma } from '../lib/prisma';

class CategoryService {
  async getAllCategoriesByUserId(userId: number): Promise<CategoryViewModel[]> {
    const categories = await prisma.category.findMany({
      where: { USER_ID: userId },
    });

    return categories.map((category) => ({
      id: category.ID,
      name: category.NAME,
      userId: category.USER_ID,
      createdAt: category.CREATED_AT,
      updatedAt: category.UPDATED_AT,
    }));
  }

  async getCategory(id: number, userId: number): Promise<CategoryViewModel> {
    const category = await prisma.category.findUnique({
      where: { ID: id, USER_ID: userId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return {
      id: category.ID,
      name: category.NAME,
      userId: category.USER_ID,
      createdAt: category.CREATED_AT,
      updatedAt: category.UPDATED_AT,
    };
  }

  async createCategory(category: CategoryViewModel): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: {
        NAME: category.name,
        USER_ID: category.userId,
      },
    });

    return newCategory;
  }

  async updateCategory(
    id: number,
    category: CategoryViewModel,
    userId: number
  ): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: { ID: id, USER_ID: userId },
      data: {
        NAME: category.name,
        USER_ID: category.userId,
      },
    });

    return updatedCategory;
  }

  async deleteCategory(id: number, userId: number): Promise<Category> {
    const deletedCategory = await prisma.category.delete({
      where: { ID: id, USER_ID: userId },
    });

    return deletedCategory;
  }
}

export default new CategoryService();
