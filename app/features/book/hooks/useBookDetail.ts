import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth';
import * as api from '../api';
import { Book } from '../types';

/**
 * Hook for fetching and managing individual book details
 */
export const useBookDetail = (id: string) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books', 'detail', id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      // Get existing book from cache
      const existingBook = queryClient.getQueryData<Book>(['books', 'detail', id]);
      // If we have a book with description, return it
      if (existingBook?.description) {
        return existingBook;
      }
      // Otherwise fetch from API
      const fetchedBook = await api.getBook(token, id);
      // Update cache with fetched book
      queryClient.setQueryData(['books', 'detail', id], fetchedBook);
      return fetchedBook;
    },
  });

  return {
    book,
    isLoading,
    error: error ? 'Failed to load book details' : null,
  };
};
