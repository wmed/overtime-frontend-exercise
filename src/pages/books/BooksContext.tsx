import React from 'react';

import { Book, BookInput } from 'src/pages/books/types';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { generateUniqueId } from 'src/utils';

interface BooksContextObject {
  books: Book[];
  createBook: (payload: BookInput) => void;
  updateBook: (uuid: string, payload: BookInput) => void;
  deleteBook: (uuid: string) => void;
  bookToEdit: Book | null;
  setBookToEdit: (uuid: string) => void;
}

const BooksContext = React.createContext<BooksContextObject>({
  books: [],
  createBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  bookToEdit: null,
  setBookToEdit: () => {},
});

type BooksProviderProps = React.PropsWithChildren<{}>;

export function BooksProvider({ children }: BooksProviderProps): React.ReactElement {
  const [books, setBooks] = useLocalStorage<Book[]>('overtime:inventory', []);
  const [bookToEdit, setBookToEdit] = React.useState<Book | null>(null);

  const createBook = (payload: BookInput) => {
    const existing = books.find((book) => book.isbn === payload.isbn);
    if (existing) {
      throw new Error('Book with the ISBN already exists!');
    }
    const newBook: Book = {
      ...payload,
      uuid: generateUniqueId(),
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const updateBook = (uuid: string, payload: BookInput) => {
    setBooks((prev) => prev.map((book) => (book.uuid !== uuid ? book : { ...payload, uuid })));
  };

  const deleteBook = (uuid: string) => {
    setBooks((prev) => prev.filter((book) => book.uuid !== uuid));
  };

  const setBookToEditWrapped = (uuid: string) => {
    setBookToEdit(books.find((book) => book.uuid === uuid) || null);
  };

  const value = {
    books,
    bookToEdit,
    setBookToEdit: setBookToEditWrapped,
    createBook,
    updateBook,
    deleteBook,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}

export const useBooksContext = () => React.useContext(BooksContext);
