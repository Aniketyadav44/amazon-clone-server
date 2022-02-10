import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.discountedMrp,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity: parseInt(quantity),
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
