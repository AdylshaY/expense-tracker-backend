import { prisma } from '../lib/prisma';
import {
  AuthResponse,
  UserCredentials,
  UserRegistration,
  UserWithToken,
} from '../types/auth.types';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.utils';
import { removeUserToken } from '../utils/token.utils';
import { USER_ROLES, isValidRole, UserRole } from '../constants/roles';

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

      let role: UserRole = USER_ROLES.USER;
      if (userData.role && isValidRole(userData.role)) {
        role = userData.role;
      }

      const user = await prisma.user.create({
        data: {
          EMAIL: userData.email,
          PASSWORD: hashedPassword,
          FIRST_NAME: userData.firstName,
          LAST_NAME: userData.lastName,
          ROLE: role,
        },
      });

      const tokens = generateTokens({
        userId: String(user.ID),
        email: user.EMAIL,
        role: user.ROLE,
      });

      const expiresIn = tokens.expiresIn;
      await prisma.userToken.create({
        data: {
          TOKEN: tokens.accessToken,
          USER_ID: user.ID,
          EXPIRES_AT: new Date(Date.now() + expiresIn),
        },
      });

      const responseData: UserWithToken = {
        user: {
          id: user.ID,
          email: user.EMAIL,
          firstName: user.FIRST_NAME,
          lastName: user.LAST_NAME,
          role: user.ROLE,
        },
        token: tokens.accessToken,
      };

      return {
        success: true,
        message: 'Sign Up successful',
        data: responseData,
        statusCode: 201,
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

      const existingToken = await prisma.userToken.findFirst({
        where: {
          USER_ID: user.ID,
          EXPIRES_AT: {
            gt: new Date(),
          },
        },
      });

      let tokenValue: string;

      if (existingToken) {
        tokenValue = existingToken.TOKEN;
      } else {
        const tokens = generateTokens({
          userId: String(user.ID),
          email: user.EMAIL,
          role: user.ROLE,
        });

        tokenValue = tokens.accessToken;

        const expiresIn = tokens.expiresIn;
        await prisma.userToken.create({
          data: {
            TOKEN: tokenValue,
            USER_ID: user.ID,
            EXPIRES_AT: new Date(Date.now() + expiresIn),
          },
        });
      }

      const responseData: UserWithToken = {
        user: {
          id: user.ID,
          email: user.EMAIL,
          firstName: user.FIRST_NAME,
          lastName: user.LAST_NAME,
          role: user.ROLE,
        },
        token: tokenValue,
      };

      return {
        success: true,
        message: 'Sign In successful',
        data: responseData,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred during sign in');
      }
    }
  }

  async signOut(userId: string, token: string): Promise<AuthResponse> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const user = await prisma.user.findUnique({
        where: { ID: parseInt(userId) },
      });

      if (!user) {
        throw new Error('User not found');
      }

      await removeUserToken(parseInt(userId));

      await prisma.user.update({
        where: { ID: parseInt(userId) },
        data: {
          UPDATED_AT: new Date(),
        },
      });

      return {
        success: true,
        message: 'Sign Out successful',
        statusCode: 200,
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
