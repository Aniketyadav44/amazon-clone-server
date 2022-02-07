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

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    await axios.get(`/api/v1/logout`);
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAILURE", payload: error.response.data.message });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/user/update", userData, config);
    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (passData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASS_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/password/update", passData, config);
    dispatch({ type: "UPDATE_PASS_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PASS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
