import { prisma } from '../lib/prisma';

/**
 * Check if a token is valid and not expired
 */
export const isValidToken = async (token: string): Promise<boolean> => {
  try {
    const userToken = await prisma.userToken.findUnique({
      where: { TOKEN: token },
    });

    if (!userToken) return false;

    if (userToken.EXPIRES_AT < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};

/**
 * Remove user token (for sign out)
 */
export const removeUserToken = async (userId: number): Promise<void> => {
  try {
    await prisma.userToken.deleteMany({
      where: { USER_ID: userId },
    });
  } catch (error) {
    console.error('Error removing user token:', error);
    throw new Error('Failed to remove token');
  }
};

/**
 * Clean up expired tokens
 * This can be run as a scheduled job
 */
export const cleanupExpiredTokens = async (): Promise<number> => {
  try {
    const result = await prisma.userToken.deleteMany({
      where: {
        EXPIRES_AT: {
          lt: new Date(),
        },
      },
    });

    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
    return 0;
  }
};
