import Item from "./Item";

export enum ActionKind {
  CLEAR_CART = "CLEAR_CART",
  REMOVE = "REMOVE",
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  GET_TOTALS = "GET_TOTALS",
  LOADING = "LOADING",
  DISPLAY_ITEMS = "DISPLAY_ITEMS",
  TOGGLE_AMOUNT = "TOGGLE_AMOUNT",
}

export type Action =
  | { type: ActionKind.CLEAR_CART }
  | { type: ActionKind.REMOVE; payload: number }
  | { type: ActionKind.INCREASE; payload: number }
  | { type: ActionKind.DECREASE; payload: number }
  | { type: ActionKind.GET_TOTALS }
  | { type: ActionKind.LOADING }
  | { type: ActionKind.DISPLAY_ITEMS; payload: Item[] }
  | {
      type: ActionKind.TOGGLE_AMOUNT;
      payload: { id: number; type: "inc" | "dec" };
    };

export interface State {
  cart: Item[];
  loading: boolean;
  total: number;
  amount: number;
}

const reducer = (state: State, action: Action) => {
  let tempCart;
  switch (action.type) {
    case ActionKind.CLEAR_CART:
      return { ...state, cart: [] };
    case ActionKind.REMOVE:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case ActionKind.INCREASE:
      tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    case ActionKind.DECREASE:
      tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    case ActionKind.GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case ActionKind.LOADING:
      return { ...state, loading: true };
    case ActionKind.DISPLAY_ITEMS:
      return { ...state, cart: action.payload, loading: false };
    case ActionKind.TOGGLE_AMOUNT:
      tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (action.payload.type === "dec") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    default:
      throw new Error("no matching action type");
  }
};

export default reducer;
