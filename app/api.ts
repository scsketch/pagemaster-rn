import axios, { AxiosError } from 'axios';

/**
 * Generic error handler for API calls
 */
export const handleApiError = (error: unknown, action: string): never => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    if (error.response.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    throw new Error(error.response.data?.message || `Failed to ${action}. Please try again.`);
  }
  throw error;
};

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
