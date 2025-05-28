import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth';
import * as api from '../api';
import { AddBookData } from '../types';

/**
 * Hook for managing book mutations (add/update)
 */
export const useBookMutations = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: addBook } = useMutation({
    mutationFn: async (bookData: AddBookData) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');

      // Create the book
      return api.createBook(token, bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: async ({ id, bookData }: { id: string; bookData: AddBookData }) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');

      // Update the book
      return api.updateBook(token, id, bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return {
    addBook,
    updateBook,
  };
};
