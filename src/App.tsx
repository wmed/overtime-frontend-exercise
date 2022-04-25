import React from "react";
import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";
import { BooksProvider } from "./contexts/Books";

function App() {
  return (
    <div style={{ padding: "1rem" }} data-testid="app">
      <BooksProvider>
        <h1>Books</h1>
        <Search />
        <Books />
      </BooksProvider>
    </div>
  );
}

export default App;
