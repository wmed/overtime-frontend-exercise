import React from 'react';
import throttle from 'lodash/throttle';

import { useBooksContext } from 'src/pages/books/BooksContext';
import { Book } from 'src/pages/books/types';

const defaultImage = 'https://via.placeholder.com/100x150.png';

export default function BookInventory() {
  const [query, setQuery] = React.useState('');
  const { books, setBookToEdit } = useBooksContext();

  const filteredBooks = React.useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase())),
    [query, books]
  );

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-11">Inventory</h1>
      <SearchFilter onChange={setQuery} />
      <div className="mt-4" />
      <BookList books={filteredBooks} onClickBook={setBookToEdit} />
    </div>
  );
}

// Filter List of Books
function SearchFilter({ onChange }: { onChange: (v: string) => void }) {
  const [value, setValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value || '');
  };
  const { current: throttledOnChange } = React.useRef(throttle(onChange, 250));
  React.useEffect(() => {
    throttledOnChange(value);
  }, [value, throttledOnChange]);

  const inputClasses =
    'rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full mt-1';

  return (
    <div className="w-60">
      <input type="text" value={value} placeholder="Search Books..." onChange={handleChange} className={inputClasses} />
    </div>
  );
}

// List of Books
function BookList({ books, onClickBook }: { books: Book[]; onClickBook: (uuid: string) => void }) {
  if (books.length === 0) {
    return <p>No Books Found.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {books.map((book) => (
        <div
          key={book.isbn}
          className="cursor-pointer rounded-lg border border-gray-300 hover:border-indigo-300 hover:ring hover:ring-indigo-200 flex flex-row h-40 overflow-hidden col-span-12 md:col-span-6"
          onClick={() => onClickBook(book.uuid)}
        >
          <img
            src={book.image || `${defaultImage}?text=${book.title}`}
            alt={book.title}
            className="w-28 h-full object-cover bg-neutral-300"
          />
          <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
            <h2 className="font-semibold">{book.title}</h2>
            <div>
              <p>
                <span className="italic text-gray-500">Author: </span>
                {book.author}
              </p>
              <p>
                <span className="italic text-gray-500">ISBN: </span>
                {book.isbn}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
