import { ADD_TO_CART, REMOVE_FROM_CART, BUY_NOW } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  let totalCount = cartItems.reduce((total, product) => total + product.count, 0);
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems, totalCount : totalCount},
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id);
  let totalCount = cartItems.reduce((total, product) => total + product.count, 0);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems, totalCount : totalCount } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const buyNow = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: BUY_NOW,
    payload: { cartItems},
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};