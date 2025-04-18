import { ApiResponse } from '../types/response.types';

/**
 * Creates a success response
 */
export const successResponse = <T>(
  message: string,
  url: string,
  data?: T,
  statusCode: number = 200
): ApiResponse<T> => ({
  success: true,
  message,
  data,
  url,
  statusCode,
});

/**
 * Creates an error response
 */
export const errorResponse = (
  message: string,
  url: string,
  error?: string | Record<string, unknown>,
  statusCode: number = 400
): ApiResponse => ({
  success: false,
  message,
  error,
  url,
  statusCode,
});

/**
 * Creates an API response with custom parameters
 */
export const createResponse = <T>(params: ApiResponse<T>): ApiResponse<T> => ({
  ...params,
});
