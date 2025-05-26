import { AxiosResponse } from 'axios';
import { api } from '../../api';
import { AddBookData, Book, PaginatedBooksResponse } from './types';

export async function getBooks(
  token: string | null,
  page: number = 1
): Promise<PaginatedBooksResponse> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
    params: {
      page,
      limit: 10,
    },
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<PaginatedBooksResponse> = await api.get('/books', config);
  return res.data;
}

export async function getBook(token: string | null, bookId: string): Promise<Book> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<Book> = await api.get(`/books/${bookId}`, config);
  return res.data;
}

export async function createBook(token: string | null, bookData: AddBookData): Promise<Book> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<Book> = await api.post('/books', bookData, config);
  return res.data;
}

export async function updateBook(
  token: string | null,
  bookId: string,
  bookData: AddBookData
): Promise<Book> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<Book> = await api.patch(`/books/${bookId}`, bookData, config);
  return res.data;
}
