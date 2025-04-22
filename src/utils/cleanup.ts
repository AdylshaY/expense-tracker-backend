import { cleanupExpiredTokens } from './token.utils';

/**
 * Scheduled function to clean up expired tokens
 * This can be called from a main application file or a scheduler
 */
export const scheduleTokenCleanup = (intervalMinutes: number = 60): NodeJS.Timeout => {
  console.log(`Token cleanup scheduled to run every ${intervalMinutes} minutes`);
  
  // Run immediately on startup
  cleanupTokens();
  
  // Then schedule to run periodically
  return setInterval(cleanupTokens, intervalMinutes * 60 * 1000);
};

/**
 * Perform the token cleanup operation
 */
const cleanupTokens = async (): Promise<void> => {
  try {
    const deletedCount = await cleanupExpiredTokens();
    if (deletedCount > 0) {
      console.log(`Token cleanup complete: removed ${deletedCount} expired tokens`);
    }
  } catch (error) {
    console.error('Error during token cleanup:', error);
  }
}; 