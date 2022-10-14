import { useState, useEffect } from "react";
import Movie from "./types/Movie";

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState<Movie[]>([]);
  const fetchMovies = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setData(data.Search || [data]);

        setError({ show: false, msg: "" });
      } else if (data.Error) {
        setError({ show: true, msg: data.Error });
      } else {
        setError({ show: false, msg: "" });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);
  return { isLoading, error, data };
};

export default useFetch;
