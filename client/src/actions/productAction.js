import axios from "axios";

//to get all products based on filters and queries
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 1000000000], rating = [0, 5]) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCT_REQUEST" });
      const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&discountedMrp[gte]=${price[0]}&discountedMrp[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
      const { data } = await axios.get(link);
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

  //to get single product by id
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
