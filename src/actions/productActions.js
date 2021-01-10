import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("./datafolder/data.json");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};
