import { AxiosResponse } from 'axios';

export interface Book {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  price: number;

  description?: string; // This is filled out when we get details
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
