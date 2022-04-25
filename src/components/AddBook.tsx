import { useState } from "react";
import { BooksConsumer, IBook } from "../contexts/Books";
import "./AddBook.css";
import GoogleBooksSearch from "./GoogleBooksSearch";

const _AddBook = ({ addBook }: { addBook: (book: IBook) => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [image, setImage] = useState("");

  const onAdd = () => {
    if (title === "") {
      alert("Book title is required!");
      return;
    }
    if (author === "") {
      alert("Book author is required!");
      return;
    }
    if (isbn === "") {
      alert("Book ISBN is required!");
      return;
    }
    if (image === "") {
      alert("Book cover image is required!");
      return;
    }
    addBook({ title, author, isbn, image });
    setTitle("");
    setAuthor("");
    setIsbn("");
    setImage("");
  };

  const onSelectBook = (book: IBook) => {
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setImage(book.image);
  };

  return (
    <div className="AddBook">
      <GoogleBooksSearch onSelect={onSelectBook} />
      <hr />
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Author</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label>ISBN</label>
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <label>Cover Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        style={{
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
          color: "white",
          padding: "0.5rem 0",
          width: "100%",
          marginTop: "1rem",
          outline: "none",
          border: "none",
        }}
        onClick={onAdd}
      >
        + Add Book
      </button>
    </div>
  );
};

const AddBook = () => (
  <BooksConsumer>
    {({ addBook }) => <_AddBook addBook={addBook} />}
  </BooksConsumer>
);

export default AddBook;
