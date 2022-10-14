import Movie from "./Movie";

export default interface RootObject {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}
