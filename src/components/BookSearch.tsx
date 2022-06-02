import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import useBookSearch from '../behaviors/use-book-search';
import { Book } from '../utils/book';
import BookCard from './BookCard';

/**
 * Because of the time limit and to show a bit more than just a few forms on the page, I decided
 * to go with having users find the book from Project Gutenberg and using that to source all the data
 * we need for users to maintain their bookshelf.
 */
export const BookSearch = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>();

  const formRef = useRef<HTMLFormElement | null>(null);

  const { loading, searchForBook, next, prev, nextUrl, prevUrl } =
    useBookSearch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  /**
   * Normally I would look into a more robust solution for form validation and state management,
   * but given the scope of this project we will rely on a more vanilla approach. We are just going
   * to do some simple validation here, which we also have some protections around with the buttons
   * being disabled with no search term set. It's an async call to an API though, so we do need some
   * checks in the form of a try/catch to handle any errors that are caught.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!search) {
      return;
    }

    const valid = formRef.current?.checkValidity();

    e.preventDefault();
    e.stopPropagation();

    if (!valid) {
      alert(
        'Unable to submit your search, please confirm the details and try again.'
      );

      return;
    }

    try {
      const response = await searchForBook(search);

      if (response) {
        setSearchResults(response.results);
      }
    } catch (e) {
      console.error('Error submitting search for books', e);
    }
  };

  return (
    <div className="ot-book-search p-2 bg-slate-50 rounded">
      <h2 className="text-xl">Book Search</h2>
      <p className="mb-1">
        Use this form to search for books to add to your bookshelf!
      </p>
      <form
        className="ot-book-search__form flex flex-col md:flex-row"
        noValidate
        ref={(instance) => (formRef.current = instance)}
        onSubmit={handleSubmit}>
        <label className="flex flex-row items-center w-full">
          <span className="mr-2">Find Book by Author or Title:</span>

          <input
            className="px-2 py-1 border-black border-2 rounded grow"
            type="text"
            value={search}
            onChange={handleChange}
          />
        </label>
        <input
          className="my-1 ml-0 md:my-0 md:ml-2 px-2 py-1 rounded bg-green-600 hover:bg-green-700  text-white transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={!search}
          type="submit"
          value="Submit"
        />
        <button
          className="my-1 ml-0 md:my-0 md:ml-2 px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700  text-white transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          type="reset"
          onClick={() => {
            setSearch('');
            setSearchResults(undefined);
          }}>
          Reset
        </button>
      </form>
      <div className="ot-book-search__results">
        <h3 className="text-lg">Results</h3>
        {/* Normally we would want a spinner here, but some simple loading text will do for now */}
        {loading && <p>Loading ...</p>}

        {!loading && !searchResults && (
          <p>Search for a title to see the results here!</p>
        )}

        {!loading &&
          !!searchResults &&
          (searchResults?.length ? (
            <ul className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </ul>
          ) : (
            <p>No results were found for that search term, please try again!</p>
          ))}

        <div className="ot-book-search__pagination mt-2 flex flex-row w-full">
          {prevUrl && (
            <button
              type="button"
              className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              onClick={async () => {
                const response = await prev();

                if (response) {
                  setSearchResults(response.results);
                }
              }}>
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              type="button"
              className="ml-auto px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              onClick={async () => {
                const response = await next();

                if (response) {
                  setSearchResults(response.results);
                }
              }}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
