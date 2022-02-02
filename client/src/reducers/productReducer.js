export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_REQUEST":
      return {
        loading: true,
        products: [],
      };
    case "ALL_PRODUCT_SUCCESS":
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case "ALL_PRODUCT_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: {}, reviewData: {} },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAIL_REQUEST":
      return {
        loading: true,
        product: {},
      };
    case "PRODUCT_DETAIL_SUCCESS":
      return {
        loading: false,
        product: action.payload.product,
        reviewData: action.payload.reviewData,
      };
    case "PRODUCT_DETAIL_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
