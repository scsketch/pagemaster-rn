import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../auth';
import * as api from '../api';
import { PaginatedBooksResponse } from '../types';
import { useDebounceSearch } from '../../../hooks';
import { useBookMutations } from './useBookMutations';

export const useBooks = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { search, setSearch, debouncedSearch } = useDebounceSearch();
  const [genreFilter, setGenreFilter] = useState('');

  const {
    data: booksData,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch: refresh,
  } = useInfiniteQuery<PaginatedBooksResponse, Error>({
    queryKey: ['books', debouncedSearch, genreFilter],
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      const response = await api.getBooks(token, pageParam as number, debouncedSearch, genreFilter);
      return response;
    },
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const books = booksData?.pages.flatMap(page => page.data) ?? [];
  const { addBook, updateBook } = useBookMutations(debouncedSearch, genreFilter);

  return {
    books,
    isLoading,
    isRefreshing: isFetchingNextPage,
    error: error ? 'Failed to load books. Please try again.' : null,
    hasMore: !!hasNextPage,
    fetchNextPage,
    refresh,
    addBook,
    updateBook,
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
  };
};
