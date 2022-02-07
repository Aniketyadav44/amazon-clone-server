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
        user: null,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
    case "UPDATE_PASS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_PROFILE_SUCCESS":
    case "UPDATE_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case "UPDATE_PROFILE_FAILURE":
    case "UPDATE_PASS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_PROFILE_RESET":
      return {
        ...state,
        isUpdated: false,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGOT_PASS_REQUEST":
    case "RESET_PASS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FORGOT_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case "RESET_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case "FORGOT_PASS_FAILURE":
    case "RESET_PASS_FAILURE":
      return {
        ...state,
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
