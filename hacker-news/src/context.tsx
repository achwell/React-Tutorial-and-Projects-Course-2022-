import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { ActionKind, State } from "./reducer";
import Hit from "./types/Hit";
import RootObject from "./types/RootObject";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

interface IContext {
  hits: Hit[];
  page: number;
  nbPages: number;
  query: string;
  isLoading: boolean;
  removeStory: (id: string) => void;
  handleSearch: (s: string) => void;
  handlePage: (o: "inc" | "dec") => void;
}

const initialState = {
  isLoading: false,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};

const AppContext = createContext<IContext>({
  ...initialState,
  removeStory(id: string): void {},
  handleSearch(s: string): void {},
  handlePage(o: "inc" | "dec"): void {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url: string) => {
    dispatch({ type: ActionKind.SET_LOADING });
    try {
      const response = await fetch(url);
      const data: RootObject = await response.json();
      dispatch({
        type: ActionKind.SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = (id: string) => {
    dispatch({ type: ActionKind.REMOVE_STORY, payload: id });
  };
  const handleSearch = (query: string) => {
    dispatch({ type: ActionKind.HANDLE_SEARCH, payload: query });
  };
  const handlePage = (value: "inc" | "dec") => {
    dispatch({ type: ActionKind.HANDLE_PAGE, payload: value });
  };
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
