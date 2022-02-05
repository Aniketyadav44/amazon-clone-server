export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        loding: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        user:null,
        loading: false,
        isAuthenticated: false,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOAD_USER_FAILURE":
    case "LOGOUT_FAILURE":
      return {
        ...state,
        loading: false,
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
