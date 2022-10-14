import { createContext, FC, useContext, useState } from "react";
import useFetch from "./useFetch";
import Movie from "./types/Movie";

interface IContext {
  isLoading: boolean;
  error?: { show: boolean; msg: string };
  movies: Movie[];
  query: string;
  setQuery: (q: string) => void;
}

const AppContext = createContext<IContext>({
  isLoading: false,
  movies: [],
  query: "",
  setQuery(_: string): void {},
});

const AppProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [query, setQuery] = useState("batman");
  const { isLoading, error, data: movies } = useFetch(`&s=${query}`);
  return (
    // @ts-ignore
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
