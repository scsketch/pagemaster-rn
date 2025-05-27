import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth';
import * as api from '../api';
import { AddBookData, Book } from '../types';

/**
 * Hook for managing book mutations (add/update)
 */
export const useBookMutations = (search: string, genreFilter: string) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: addBook } = useMutation({
    mutationFn: async (bookData: AddBookData) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return api.createBook(token, bookData);
    },
    onSuccess: newBook => {
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: ['books'] });
      // Update detail cache
      queryClient.setQueryData(['books', 'detail', newBook.id], newBook);
    },
  });

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: async ({ id, bookData }: { id: string; bookData: AddBookData }) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      // Optimistically update the cache
      const previousBook = queryClient.getQueryData<Book>(['books', 'detail', id]);
      if (previousBook) {
        queryClient.setQueryData(['books', 'detail', id], {
          ...previousBook,
          ...bookData,
          id: previousBook.id, // Ensure we keep the original ID
        });
      }
      return api.updateBook(token, id, bookData);
    },
    onSuccess: updatedBook => {
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: ['books'] });
      // Update detail cache with server response
      queryClient.setQueryData(['books', 'detail', updatedBook.id], updatedBook);
    },
    onError: (_, { id }) => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', id] });
    },
  });

  return {
    addBook,
    updateBook,
  };
};
