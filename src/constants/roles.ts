/**
 * Role constants for the application
 * Since SQL Server doesn't support enums, we define roles as constants
 */
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

/**
 * Validate if a string is a valid user role
 */
export function isValidRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
} 