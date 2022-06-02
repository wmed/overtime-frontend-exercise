import classNames from 'classnames';
import { useBookshelf } from '../behaviors/use-bookshelf';
import { Book } from '../utils/book';

export interface BookCardProps {
  book: Book;
}

/**
 * I ended up going with the Gutendex for searching books since it was a quick and easy API
 * to get up and running. I realize it does not include ISBN data, but of the API options I
 * had it was either we lose the ability to search for books, or I set up something a bit
 * more complicated with authentication.
 *
 * Another solution I considered implementing here, would be to allow the user to enter in a
 * custom ISBN for their book, which would handle various editions/prints.
 */
const BookCard = ({ book }: BookCardProps) => {
  const { addBook, hasBook, removeBook } = useBookshelf();
  const { formats, title, authors } = book;
  const inBookshelf = hasBook(book);

  const buttonClasses = classNames(
    'px-2 py-1 rounded text-white transition-colors',
    inBookshelf && 'bg-red-600 hover:bg-red-700',
    !inBookshelf && 'bg-green-600 hover:bg-green-700'
  );

  return (
    <li className="ot-book-card lex flex-col w-full rounded overflow-hidden shadow-md">
      <img
        className="h-48 w-full object-cover"
        src={formats['image/jpeg']}
        alt={title}
      />
      <div className="p-2">
        <div className="font-bold text-base mb-2 max-h-12 truncate overflow-hidden">
          {title}
        </div>
        <p className="text-gray-700 text-sm">
          {authors.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </p>
        <div className="mt-2">
          <button
            className={buttonClasses}
            type="button"
            onClick={() => (inBookshelf ? removeBook(book) : addBook(book))}>
            {inBookshelf ? 'Remove From Bookshelf' : 'Add To Bookshelf'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default BookCard;
