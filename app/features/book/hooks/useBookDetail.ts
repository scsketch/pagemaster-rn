import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../auth';
import * as api from '../api';
import { Book } from '../types';

/**
 * Hook for fetching and managing individual book details
 */
export const useBookDetail = (id: string) => {
  const { getToken } = useAuth();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books', 'detail', id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return api.getBook(token, id);
    },
  });

  return {
    book,
    isLoading,
    error: error ? 'Failed to load book details' : null,
  };
};
