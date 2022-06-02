import { Book } from '../utils/book';
import { useObjectStorage } from './use-storage';

export const useBookshelf = () => {
  const [books, setBooks] = useObjectStorage<Book[]>('ot-bookshelf', []);

  const addBook = (book: Book) => setBooks([...(books || []), book]);

  const removeBook = (book: Book) => {
    if (!books) {
      return;
    }

    const index = books.findIndex(({ id }) => id === book.id);

    if (index >= 0) {
      const next = [...(books || [])];
      next.splice(index, 1);
      setBooks(next);
    }
  };

  const findBook = (titleSearch: string) =>
    books?.filter(({ title }) => title.includes(titleSearch)) || [];

  const hasBook = ({ id }: Book) => {
    return books !== null && !!books.find((book) => book.id === id);
  };

  return {
    books,
    addBook,
    findBook,
    hasBook,
    removeBook,
  };
};
