import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Book from "./Book";
import { books } from "./books";
import "./index.css";

function BookList() {
  return (
    <section className="bookList">
      {books.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </section>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <BookList />
  </StrictMode>
);
