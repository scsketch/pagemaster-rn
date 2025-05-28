import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth';
import * as api from '../api';
import { AddBookData } from '../types';
import { handleApiError } from '../../../api';

/**
 * Hook for managing book mutations (add/update)
 */
export const useBookMutations = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: addBook, error: addBookError } = useMutation({
    mutationFn: async (bookData: AddBookData) => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Unauthorized');

        // Create the book
        return await api.createBook(token, bookData);
      } catch (error) {
        return handleApiError(error, 'create book');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const { mutateAsync: updateBook, error: updateBookError } = useMutation({
    mutationFn: async ({ id, bookData }: { id: string; bookData: AddBookData }) => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Unauthorized');

        // Update the book
        return await api.updateBook(token, id, bookData);
      } catch (error) {
        return handleApiError(error, 'update book');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return {
    addBook,
    updateBook,
    addBookError,
    updateBookError,
  };
};
