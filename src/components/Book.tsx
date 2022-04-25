import { BooksConsumer, IBook } from "../contexts/Books";

const _Book = ({
  book,
  removeBook,
}: {
  book: IBook;
  removeBook: (id: string) => void;
}) => (
  <div>
    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
      <img style={{ width: "50%" }} alt="Cover" src={book.image} />
      <div>
        <h3>{book.title}</h3>
        <div>{book.author}</div>
        <div>{book.isbn}</div>
      </div>
    </div>
    <button style={{ color: "red" }} onClick={() => removeBook(book.id ?? "")}>
      Delete
    </button>
  </div>
);

const Book = ({ book }: { book: IBook }) => (
  <BooksConsumer>
    {({ removeBook }) => <_Book book={book} removeBook={removeBook} />}
  </BooksConsumer>
);

export default Book;
