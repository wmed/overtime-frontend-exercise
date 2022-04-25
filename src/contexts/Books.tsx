import React, { useEffect, useState } from "react";

//Should replace this with a uuid library
const randomID = () => String(Math.floor(Math.random() * 100000));

export interface IBook {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  image: string;
}

interface iBooksProviderValue {
  books: IBook[];
  addBook: (book: IBook) => void;
  removeBook: (id: string) => void;
}

const localStorageKey = "overtime::books";
const defaultContext: iBooksProviderValue = {
  books: (() => {
    try {
      const stored = localStorage.getItem(localStorageKey);
      if (!stored) {
        return [];
      }
      return JSON.parse(stored);
    } catch (error) {
      return [];
    }
  })(),
  addBook: () => {},
  removeBook: () => {},
};
const { Provider, Consumer } = React.createContext(defaultContext);

export const BooksProvider = ({ children }: { children: any }) => {
  const [books, setBooks] = useState<IBook[]>(defaultContext.books);
  const [search, setSearch] = useState(
    decodeURI(window.location.hash.slice(1))
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(books));
  }, [books]);
  const addBook = (book: IBook) => {
    setBooks((books) => [...books, { ...book, id: randomID() }]);
  };
  const removeBook = (id: string) => {
    setBooks((books) => books.filter((b) => b.id !== id));
  };
  const onHashChange = () => {
    setSearch(decodeURI(window.location.hash.slice(1)));
  };
  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const value: iBooksProviderValue = {
    books: books.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search)
    ),
    addBook,
    removeBook,
  };
  return <Provider value={value}>{children}</Provider>;
};

export const BooksConsumer = (C: React.ConsumerProps<iBooksProviderValue>) => (
  <Consumer>{C.children}</Consumer>
);
