import { ADD_TO_CART, REMOVE_FROM_CART, BUY_NOW } from "../types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems, totalItem: action.payload.totalCount  };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems, totalItem: action.payload.totalCount };
    case BUY_NOW:
      return { cartItems: action.payload.cartItems  };
    default:
      return state;
  }
};
