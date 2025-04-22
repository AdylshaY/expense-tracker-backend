import { prisma } from '../lib/prisma';
import { User } from '@prisma/client';
import { UserViewModel } from '../types/user.types';

class UserService {
  async getAllUsers(): Promise<UserViewModel[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => ({
      ID: user.ID,
      EMAIL: user.EMAIL,
      FIRST_NAME: user.FIRST_NAME,
      LAST_NAME: user.LAST_NAME,
      ROLE: user.ROLE,
      CREATED_AT: user.CREATED_AT,
      UPDATED_AT: user.UPDATED_AT,
    }));
  }

  async getUser(id: number, currentUserId: number): Promise<UserViewModel> {
    if (id !== currentUserId) {
      throw new Error('You are not authorized to view this user');
    }

    const user = await prisma.user.findUnique({
      where: { ID: id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userData: UserViewModel = {
      ID: user.ID,
      EMAIL: user.EMAIL,
      FIRST_NAME: user.FIRST_NAME,
      LAST_NAME: user.LAST_NAME,
      ROLE: user.ROLE,
      CREATED_AT: user.CREATED_AT,
      UPDATED_AT: user.UPDATED_AT,
    };

    return userData;
  }

  async updateUser(
    id: number,
    user: User,
    currentUserId: number
  ): Promise<User> {
    const existingUser = await this.getUser(id, currentUserId);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { ID: id },
      data: user,
    });

    return updatedUser;
  }

  async deleteUser(id: number, currentUserId: number): Promise<User> {
    const existingUser = await this.getUser(id, currentUserId);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const deletedUser = await prisma.user.delete({
      where: { ID: id },
    });

    return deletedUser;
  }
}

export default new UserService();
