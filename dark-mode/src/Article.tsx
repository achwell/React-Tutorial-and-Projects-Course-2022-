import React, { FC } from "react";
import moment from "moment";

const Article: FC<{
  title: string;
  snippet: string;
  date: Date;
  length: number;
}> = ({ title, snippet, date, length }) => {
  return (
    <article className="post">
      <h2>{title}</h2>
      <div className="post-info">
        <span>{moment(date).format("dddd Do, YYYY")}</span>
        <span>{length} min read</span>
      </div>
      <p>{snippet}</p>
    </article>
  );
};

export default Article;
