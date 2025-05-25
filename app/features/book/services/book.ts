import axios from 'axios';
import { Platform } from 'react-native';

export interface Book {
  bookId: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
}

export async function getBooks(token?: string | null): Promise<Book[]> {
  const config: any = {
    baseURL: 'http://localhost:3000/api/v1',
  };

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get('/books', config);
  return response.data;
}
