import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import * as service from '../service';
import { AddBookData, Book, PaginatedBooksResponse } from '../types';

export const useBooks = () => {
  const { getToken } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (page: number = 1) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Unauthorized');
      const response = await service.getBooks(token, page);

      if (page === 1) {
        setBooks(response.data);
      } else {
        setBooks(prev => [...prev, ...response.data]);
      }

      setHasMore(page < response.totalPages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const addBook = async (bookData: AddBookData): Promise<Book> => {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');
    const book = await service.createBook(token, bookData);

    // Add new book to the top so it shows up after we add it via the UI and return to the screen
    setBooks(prev => [...prev, book]);

    return book;
  };

  const fetchNextPage = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    await fetchBooks(currentPage + 1);
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await fetchBooks(1);
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  // const addBook = async (bookData: AddBookData): Promise<Book> => {
  //   // const token = await getToken();
  //   // if (!token) throw new Error('No token found');
  //   // const res = await service.createBook(token, bookData);
  // };

  return {
    books,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    fetchNextPage,
    refresh,
    addBook,
  };
};
