import { prisma } from '../lib/prisma';
import {
  AuthResponse,
  UserCredentials,
  UserRegistration,
} from '../types/auth.types';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.utils';

class AuthService {
  async signUp(userData: UserRegistration): Promise<AuthResponse> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { EMAIL: userData.email },
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = await prisma.user.create({
        data: {
          EMAIL: userData.email,
          PASSWORD: hashedPassword,
          FIRST_NAME: userData.firstName,
          LAST_NAME: userData.lastName,
        },
      });

      const tokens = generateTokens({
        userId: String(user.ID),
        email: user.EMAIL,
      });

      return {
        success: true,
        message: 'Sign Up successful',
        data: user,
        token: tokens.accessToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred during sign up');
      }
    }
  }

  async signIn(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { EMAIL: credentials.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.PASSWORD
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const tokens = generateTokens({
        userId: String(user.ID),
        email: user.EMAIL,
      });

      return {
        success: true,
        message: 'Sign In successful',
        token: tokens.accessToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred during sign in');
      }
    }
  }

  async signOut(userId: string): Promise<AuthResponse> {
    try {
      // In a real implementation, you might:
      // 1. Add the token to a blacklist in Redis/DB
      // 2. Clear user sessions
      // 3. Update user's status in the database

      return {
        success: true,
        message: 'Sign Out successful',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred during sign out');
      }
    }
  }
}

export default new AuthService();
