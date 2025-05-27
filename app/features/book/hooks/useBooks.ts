import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../auth';
import * as api from '../api';
import { AddBookData, Book, PaginatedBooksResponse } from '../types';
import { useDebounceSearch } from '../../../hooks';

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
      return api.getBooks(token, pageParam as number, debouncedSearch, genreFilter);
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

  const { mutateAsync: fetchBook } = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return api.getBook(token, id);
    },
    onSuccess: book => {
      queryClient.setQueryData(['books', debouncedSearch, genreFilter], (old: any) => {
        if (!old) return { pages: [{ data: [book] }] };

        const pageIndex = old.pages.findIndex((page: any) =>
          page.data.some((b: Book) => b.id === book.id)
        );

        if (pageIndex === -1) {
          return {
            ...old,
            pages: old.pages.map((page: any, index: number) => {
              if (index === 0) {
                return {
                  ...page,
                  data: [book, ...page.data],
                };
              }
              return page;
            }),
          };
        }

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === pageIndex) {
              return {
                ...page,
                data: page.data.map((b: Book) => (b.id === book.id ? book : b)),
              };
            }
            return page;
          }),
        };
      });

      if (debouncedSearch) {
        queryClient.setQueryData(['books', ''], (old: any) => {
          if (!old) return { pages: [{ data: [book] }] };

          const pageIndex = old.pages.findIndex((page: any) =>
            page.data.some((b: Book) => b.id === book.id)
          );

          if (pageIndex === -1) {
            return {
              ...old,
              pages: old.pages.map((page: any, index: number) => {
                if (index === 0) {
                  return {
                    ...page,
                    data: [book, ...page.data],
                  };
                }
                return page;
              }),
            };
          }

          return {
            ...old,
            pages: old.pages.map((page: any, index: number) => {
              if (index === pageIndex) {
                return {
                  ...page,
                  data: page.data.map((b: Book) => (b.id === book.id ? book : b)),
                };
              }
              return page;
            }),
          };
        });
      }

      queryClient.setQueryData(['book', book.id], book);
    },
  });

  const { mutateAsync: addBook } = useMutation({
    mutationFn: async (bookData: AddBookData) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return api.createBook(token, bookData);
    },
    onSuccess: newBook => {
      queryClient.setQueryData(['books'], (old: any) => {
        if (!old) return { pages: [{ data: [newBook] }] };
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [newBook, ...page.data],
              };
            }
            return page;
          }),
        };
      });
    },
  });

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: async ({ id, bookData }: { id: string; bookData: AddBookData }) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return api.updateBook(token, id, bookData);
    },
    onSuccess: updatedBook => {
      queryClient.setQueryData(['books', debouncedSearch], (old: any) => {
        if (!old) return { pages: [{ data: [updatedBook] }] };

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((b: Book) => (b.id === updatedBook.id ? updatedBook : b)),
          })),
        };
      });

      if (debouncedSearch) {
        queryClient.setQueryData(['books', ''], (old: any) => {
          if (!old) return { pages: [{ data: [updatedBook] }] };

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              data: page.data.map((b: Book) => (b.id === updatedBook.id ? updatedBook : b)),
            })),
          };
        });
      }

      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
    },
  });

  return {
    books,
    isLoading,
    isRefreshing: isFetchingNextPage,
    error: error ? 'Failed to load books. Please try again.' : null,
    hasMore: !!hasNextPage,
    fetchNextPage,
    fetchBook,
    refresh,
    addBook,
    updateBook,
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
  };
};
