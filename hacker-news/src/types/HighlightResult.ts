import Author from "./Author";
import Url from "./Url";
import Title from "./Title";

export default interface HighlightResult {
  title: Title;
  url: Url;
  author: Author;
}
