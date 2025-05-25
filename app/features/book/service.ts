import { AxiosResponse } from 'axios';
import { api } from '../../api';
import { Book, PaginatedBooksResponse } from './types';

export async function getBooks(token: string | null): Promise<PaginatedBooksResponse> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse<PaginatedBooksResponse> = await api.get('/books', config);
  return res.data;
}
