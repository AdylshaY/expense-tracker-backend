export interface AuthResponse {
  success: boolean;
  message: string;
  data?: object;
  error?: string | Record<string, unknown>;
  statusCode?: number;
}

export interface UserWithToken {
  user?: object;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  firstName: string;
  lastName: string;
  role?: string;
}

export interface UserData {
  ID: string;
  EMAIL: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  PASSWORD: string;
  ROLE: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
}
