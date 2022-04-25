import { BooksConsumer } from "../contexts/Books";
import AddBook from "./AddBook";
import Book from "./Book";
import "./Books.css";

const Books = () => (
  <BooksConsumer>
    {({ books }) => (
      <ul
        className="Books"
        style={{
          display: "grid",
          gap: "1rem",
          marginLeft: "0",
          listStyleType: "none",
        }}
      >
        <li
          style={{
            marginLeft: "0",
            listStyleType: "none",
            border: "1px solid #efefef",
            padding: "1rem",
          }}
        >
          <AddBook />
        </li>
        {books.map((b) => (
          <li
            key={b.title}
            style={{
              marginLeft: "0",
              listStyleType: "none",
              border: "1px solid #efefef",
              padding: "1rem",
            }}
          >
            <Book book={b} />
          </li>
        ))}
      </ul>
    )}
  </BooksConsumer>
);

export default Books;
