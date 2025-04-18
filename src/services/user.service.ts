import { prisma } from '../lib/prisma';
import { User } from '@prisma/client';

class UserService {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { ID: id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id: number, user: User): Promise<User> {
    const existingUser = await this.getUser(id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { ID: id },
      data: user,
    });

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {
    const existingUser = await this.getUser(id);

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
