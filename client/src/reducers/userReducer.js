export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        loding: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
