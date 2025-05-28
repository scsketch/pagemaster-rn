import { api } from '../../api';
import { LoginCredentials, LoginResponse, LogoutResponse } from './types';

/**
 * Registers a new user
 */
export const signUp = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('auth/signup', credentials);
  return response.data;
};

/**
 * Authenticates a user
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

/**
 * Logs out the current user
 */
export const logout = async (token: string): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>(
    '/auth/logout',
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
