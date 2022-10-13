import React, { FC } from "react";
import { BookProps } from "./BookProps";

const Book: FC<BookProps> = ({ title, author, image, children }) => {
  const clickHandler = () => {
    console.log({ title, author, image, children });
  };
  const complexeExample = (title: string, author: string, image: string) => {
    console.log({ title, author, image });
  };
  return (
    <article
      className="book"
      onMouseOver={() => {
        console.log({ title });
      }}
    >
      <img src={image} alt={title} />
      <h1 onClick={() => console.log({ title })}>{title}</h1>
      <h4>{author.toUpperCase()}</h4>
      {children && children}
      <button type="button" onClick={clickHandler}>
        Reference
      </button>
      <button
        type="button"
        onClick={() => complexeExample(title, author, image)}
      >
        More complex example
      </button>
    </article>
  );
};

export default Book;
