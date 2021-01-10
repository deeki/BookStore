import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, CLEAR_CART } from "../types";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    case CLEAR_CART:
      return { cartItems: null };
    case FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};
export { orderReducer };
