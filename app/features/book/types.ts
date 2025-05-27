export const GENRE_LIST = [
  'Adventure',
  'Biography',
  'Fantasy',
  'Fiction',
  'Historical',
  'Horror',
  'Mystery',
  'Non-Fiction',
  'Romance',
  'Sci-Fi',
];

export type Genre =
  | 'Adventure'
  | 'Biography'
  | 'Fantasy'
  | 'Fiction'
  | 'Historical'
  | 'Horror'
  | 'Mystery'
  | 'Non-Fiction'
  | 'Romance'
  | 'Sci-Fi';

export type GenreIcon =
  | 'compass'
  | 'person'
  | 'sparkles'
  | 'book'
  | 'time'
  | 'skull'
  | 'search-circle'
  | 'rocket'
  | 'heart';

export const getGenreIcon = (genre: string): GenreIcon => {
  const iconByGenre: Record<string, GenreIcon> = {
    Adventure: 'compass',
    Biography: 'person',
    Fantasy: 'sparkles',
    Fiction: 'book',
    Historical: 'time',
    Horror: 'skull',
    Mystery: 'search-circle',
    'Non-Fiction': 'book',
    Romance: 'heart',
    'Sci-Fi': 'rocket',
  };

  return iconByGenre[genre] || 'question-mark';
};

export interface Book {
  bookId: string;
  title: string;
  author: string;
  genre: Genre;
  price: number;
  description: string;
}

export interface PaginatedBooksParams {
  page: number;
  limit: number;
  search?: string;
  genre?: string;
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
  genre: Genre;
  price: number;
  description?: string;
}

export interface UpdateBookData extends AddBookData {
  id: string;
}
