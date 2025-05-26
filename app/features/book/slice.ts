import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, PaginatedBooksResponse } from './types';

interface BooksState {
  books: Book[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: BooksState = {
  books: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    appendBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = [...state.books, ...action.payload];
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.bookId === action.payload.bookId);
      if (index !== -1) {
        state.books[index] = action.payload;
      } else {
        state.books.push(action.payload);
      }
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    updatePagination: (state, action: PayloadAction<PaginatedBooksResponse>) => {
      state.hasMore = action.payload.page < action.payload.totalPages;
      state.currentPage = action.payload.page;
    },
  },
});

export const {
  setBooks,
  appendBooks,
  updateBook,
  addBook,
  setLoading,
  setRefreshing,
  setError,
  setCurrentPage,
  setHasMore,
  updatePagination,
} = booksSlice.actions;

export default booksSlice.reducer;
