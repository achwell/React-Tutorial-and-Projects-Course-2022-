import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useReducer,
  useEffect,
} from "react";
import cartItems from "./data";
import reducer, { ActionKind } from "./reducer";
import Item from "./Item";

const url = "https://course-api.com/react-useReducer-cart-project";

interface IContext {
  loading: boolean;
  amount: number;
  cart: Item[];
  total: number;
  clearCart: () => void;
  remove: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  toggleAmount: (id: number, type: "inc" | "dec") => void;
}

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppContext = createContext<IContext>({
  ...initialState,
  clearCart: () => {},
  remove: (id: number) => {},
  increase: (id: number) => {},
  decrease: (id: number) => {},
  toggleAmount: (id: number, type: "inc" | "dec") => {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: ActionKind.CLEAR_CART });
  };
  const remove = (id: number) => {
    dispatch({ type: ActionKind.REMOVE, payload: id });
  };
  const increase = (id: number) => {
    dispatch({ type: ActionKind.INCREASE, payload: id });
  };
  const decrease = (id: number) => {
    dispatch({ type: ActionKind.DECREASE, payload: id });
  };
  const fetchData = async () => {
    dispatch({ type: ActionKind.LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: ActionKind.DISPLAY_ITEMS, payload: cart });
  };
  const toggleAmount = (id: number, type: "inc" | "dec") => {
    dispatch({ type: ActionKind.TOGGLE_AMOUNT, payload: { id, type } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: ActionKind.GET_TOTALS });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
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
