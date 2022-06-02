import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useBookshelf } from '../behaviors/use-bookshelf';
import { Book } from '../utils/book';
import BookCard from './BookCard';

/**
 * I wanted to keep this fairly lightweight so I went with a pretty straightforward
 * card grid. We use the same BookCard here and in the BookSearch.
 */
export const Bookshelf = () => {
  const { books, findBook } = useBookshelf();
  const [find, setFind] = useState('');
  const [findResults, setFindResults] = useState<Book[]>();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFind(e.target.value);

  /**
   * I would normally exand on form validation here, but the find is a simple filter
   * right now so no async calls, we can feel pretty safe about it. We just need to make
   * sure a title to find by is passed.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!find) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const results = findBook(find);

    if (results) {
      setFindResults(results);
    }
  };

  return (
    <div className="ot-bookshelf">
      <h2 className="text-xl">Bookshelf</h2>
      <form
        className="ot-bookshelf__form flex flex-col md:flex-row w-full"
        noValidate
        ref={(instance) => (formRef.current = instance)}
        onSubmit={handleSubmit}>
        <label className="flex flex-row items-center w-full">
          <span className="mr-2">Search Title:</span>
          <input
            required
            className="px-2 py-1 border-black border-2 rounded grow"
            type="text"
            value={find}
            onChange={handleChange}
          />
        </label>
        <input
          className="my-1 ml-0 md:my-0 md:ml-2 px-2 py-1 rounded bg-green-600 hover:bg-green-700  text-white transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={!find}
          type="submit"
          value="Submit"
        />
        <button
          className="my-1 ml-0 md:my-0 md:ml-2 px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700  text-white transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          type="reset"
          onClick={() => {
            setFind('');
            setFindResults(undefined);
          }}>
          Reset
        </button>
      </form>
      <div className="ot-bookshelf__books mt-2">
        {findResults && !findResults.length && (
          <p className="p-2">
            No books in your bookshelf matched that title. Use the book search
            form to find it and add it to your bookshelf!
          </p>
        )}

        {!findResults &&
          (books?.length ? (
            <ul className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </ul>
          ) : (
            <p className="p-2">
              No books have been added to your bookshelf. Use the book search
              form to find books and add them to your bookshelf!
            </p>
          ))}
      </div>
    </div>
  );
};
