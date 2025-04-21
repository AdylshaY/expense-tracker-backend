import { prisma } from '../lib/prisma';

/**
 * Check if a token is blacklisted
 */
export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  try {
    const blacklistedToken = await prisma.tokenBlacklist.findUnique({
      where: { TOKEN: token },
    });
    
    return !!blacklistedToken;
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    // If there's an error, we assume the token is not blacklisted
    // to prevent blocking legitimate requests
    return false;
  }
};

/**
 * Add a token to the blacklist
 */
export const blacklistToken = async (token: string, userId: number, expiresIn: number = 86400000): Promise<void> => {
  try {
    await prisma.tokenBlacklist.create({
      data: {
        TOKEN: token,
        USER_ID: userId,
        EXPIRES_AT: new Date(Date.now() + expiresIn), // Default: 24 hours from now
      },
    });
  } catch (error) {
    console.error('Error blacklisting token:', error);
    throw new Error('Failed to blacklist token');
  }
};

/**
 * Clean up expired tokens from the blacklist
 * This can be run as a scheduled job
 */
export const cleanupBlacklistedTokens = async (): Promise<number> => {
  try {
    const result = await prisma.tokenBlacklist.deleteMany({
      where: {
        EXPIRES_AT: {
          lt: new Date(),
        },
      },
    });
    
    return result.count;
  } catch (error) {
    console.error('Error cleaning up token blacklist:', error);
    return 0;
  }
}; 