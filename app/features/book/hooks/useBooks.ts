import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import * as service from '../service';
import { AddBookData, Book } from '../types';

export const useBooks = () => {
  const { getToken } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect books');
    setIsLoading(true);

    const fetchBooks = async () => {
      console.log('fetchBooks');
      try {
        const token = await getToken();
        if (!token) throw new Error('Unauthorized');
        const books = await service.getBooks(token);
        setBooks(books.data);
      } catch (err) {
        setError('Failed to load books. Please try again.');
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // const addBook = async (bookData: AddBookData): Promise<Book> => {
  //   // const token = await getToken();
  //   // if (!token) throw new Error('No token found');
  //   // const res = await service.createBook(token, bookData);
  // };

  return {
    books,
    isLoading,
    error,
    // addBook,
  };
};
