import { AxiosResponse } from 'axios';

export interface Book {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  price: number;
}

export interface PaginatedBooksResponse {
  data: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AddBookData {
  title: string;
  author: string;
  genre: string;
  price: number;
}
