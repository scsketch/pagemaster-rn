export const GENRE_LIST = [
  'Adventure',
  'Biography',
  'Fantasy',
  'Fiction',
  'Historical',
  'Horror',
  'Mystery',
  'Non-Fiction',
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
  | 'Sci-Fi';

export type GenreIcon =
  | 'compass'
  | 'person'
  | 'sparkles'
  | 'book'
  | 'time'
  | 'skull'
  | 'search'
  | 'rocket';

export const getGenreIcon = (genre: string): GenreIcon => {
  const iconMap: Record<string, GenreIcon> = {
    Adventure: 'compass',
    Biography: 'person',
    Fantasy: 'sparkles',
    Fiction: 'book',
    Historical: 'time',
    Horror: 'skull',
    Mystery: 'search',
    'Non-Fiction': 'book',
    'Sci-Fi': 'rocket',
  };
  return iconMap[genre] || 'question-mark';
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
