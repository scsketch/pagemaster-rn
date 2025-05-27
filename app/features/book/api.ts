import { AxiosResponse } from 'axios';
import { api } from '../../api';
import { AddBookData, Book, PaginatedBooksParams, PaginatedBooksResponse } from './types';

export async function getBooks(
  token: string | null,
  page: number = 1,
  search?: string,
  genre?: string
): Promise<PaginatedBooksResponse> {
  let params: PaginatedBooksParams = {
    page,
    limit: 10,
  };

  if (search) {
    params.search = search;
  }

  if (genre) {
    params.genre = genre;
  }

  const config: any = {
    params,
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<PaginatedBooksResponse> = await api.get('/books', config);
  return res.data;
}

export async function getBook(token: string | null, bookId: string): Promise<Book> {
  const config: any = {};

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<Book> = await api.get(`/books/${bookId}`, config);
  return res.data;
}

export async function createBook(token: string | null, bookData: AddBookData): Promise<Book> {
  const config: any = {};

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
  const config: any = {};

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<Book> = await api.patch(`/books/${bookId}`, bookData, config);
  return res.data;
}
