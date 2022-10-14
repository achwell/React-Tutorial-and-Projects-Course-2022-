import Hit from "./types/Hit";

export enum ActionKind {
  SET_LOADING = "SET_LOADING",
  SET_STORIES = "SET_STORIES",
  REMOVE_STORY = "REMOVE_STORY",
  HANDLE_PAGE = "HANDLE_PAGE",
  HANDLE_SEARCH = "HANDLE_SEARCH",
}

export type Action =
  | { type: ActionKind.SET_LOADING }
  | { type: ActionKind.SET_STORIES; payload: { hits: Hit[]; nbPages: number } }
  | { type: ActionKind.REMOVE_STORY; payload: string }
  | { type: ActionKind.HANDLE_PAGE; payload: "inc" | "dec" }
  | { type: ActionKind.HANDLE_SEARCH; payload: string };

export interface State {
  isLoading: boolean;
  hits: Hit[];
  page: number;
  nbPages: number;
  query: string;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.SET_LOADING:
      return { ...state, isLoading: true };
    case ActionKind.SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case ActionKind.REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };
    case ActionKind.HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 };
    case ActionKind.HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      return { ...state };
    default:
      throw new Error(`no mathching "${action}" action type`);
  }
};
export default reducer;
