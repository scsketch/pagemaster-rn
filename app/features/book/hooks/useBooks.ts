import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth/hooks/useAuth';
import * as service from '../service';
import { AddBookData, Book, Genre, PaginatedBooksResponse } from '../types';
import { useState } from 'react';
import { useDebounceSearch } from '../../../hooks/useDebounceSearch';

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
      return service.getBooks(token, pageParam as number, debouncedSearch, genreFilter);
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
    mutationFn: async (bookId: string) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return service.getBook(token, bookId);
    },
    onSuccess: book => {
      queryClient.setQueryData(['books', debouncedSearch, genreFilter], (old: any) => {
        if (!old) return { pages: [{ data: [book] }] };

        const pageIndex = old.pages.findIndex((page: any) =>
          page.data.some((b: Book) => b.bookId === book.bookId)
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
                data: page.data.map((b: Book) => (b.bookId === book.bookId ? book : b)),
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
            page.data.some((b: Book) => b.bookId === book.bookId)
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
                  data: page.data.map((b: Book) => (b.bookId === book.bookId ? book : b)),
                };
              }
              return page;
            }),
          };
        });
      }

      queryClient.setQueryData(['book', book.bookId], book);
    },
  });

  const { mutateAsync: addBook } = useMutation({
    mutationFn: async (bookData: AddBookData) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return service.createBook(token, bookData);
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
    mutationFn: async ({ bookId, bookData }: { bookId: string; bookData: AddBookData }) => {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      return service.updateBook(token, bookId, bookData);
    },
    onSuccess: updatedBook => {
      queryClient.setQueryData(['books', debouncedSearch], (old: any) => {
        if (!old) return { pages: [{ data: [updatedBook] }] };

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((b: Book) => (b.bookId === updatedBook.bookId ? updatedBook : b)),
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
              data: page.data.map((b: Book) => (b.bookId === updatedBook.bookId ? updatedBook : b)),
            })),
          };
        });
      }

      queryClient.setQueryData(['book', updatedBook.bookId], updatedBook);
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
