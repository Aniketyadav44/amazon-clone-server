import axios from "axios";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_PRODUCT_REQUEST" });
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: "ALL_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "ALL_PRODUCT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" });
    const { data } = await axios.get(`/api/v1/product/${id}`).catch((error) => {
      dispatch({
        type: "PRODUCT_DETAIL_FAILURE",
        payload: error.message,
      });
      return;
    });
    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAIL_FAILURE",
      payload: error.response.data,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
