import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, FETCH_ORDERS } from "../types";

export const createOrder = (order) => (dispatch) => {
  localStorage.setItem("order", JSON.stringify(order));
  dispatch({ type: CREATE_ORDER, payload: order });
};
export const clearCart = (product) => (dispatch, getState) => {
    const cartItems = localStorage.setItem("cartItems", "");
    dispatch({ type: CLEAR_ORDER, payload: cartItems});
};
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
export const fetchOrders = () => (dispatch) => {
  const order = localStorage.getItem("order");
  dispatch({ type: FETCH_ORDERS, payload: JSON.parse(order) });
};
