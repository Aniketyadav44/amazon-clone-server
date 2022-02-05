import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/new/user`,
      { name, email, password },
      config
    );

    dispatch({ type: "REGISTER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
