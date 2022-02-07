import React, { useState, useEffect, useRef } from "react";
import styles from "./ResetPassword.module.css";
import logo from "../../../images/amazon.png";
import MetaData from "../../layouts/MetaData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [passError, setPassError] = useState([false, ""]);

  const pass = useRef();
  const confirmPass = useRef();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const { token } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
      return;
    }
    if (success) {
      alert.success("Password reset successfully");
      navigate("/signin");
    }
  }, [alert, error, dispatch, success, loading, navigate]);

  const submitClickHandler = () => {
    const inputPass = pass.current.value;
    const inputConfirmPass = confirmPass.current.value;
    setPassError([false, ""]);
    if (!inputPass || !inputConfirmPass) {
      setPassError([true, "Please enter your password."]);
      return;
    }
    if (inputPass !== inputConfirmPass) {
      setPassError([true, "Passwords do not match."]);
      return;
    }
    dispatch(
      resetPassword(token, {
        password: inputPass,
        confirmPassword: inputConfirmPass,
      })
    );
  };
  return (
    <div className={styles.resetp}>
      <MetaData title="Reset Password" />
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <h1>Reset Password</h1>
        <p>
          Enter password and confirm password to reset your account's password.
        </p>
        <label htmlFor="pass">New Password</label>
        <input type="password" id="pass" ref={pass} />
        <label htmlFor="cpass">Confirm new Password</label>
        <input type="password" id="cpass" ref={confirmPass} />
        {passError[0] && (
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            {passError[1]}
          </p>
        )}
        <button onClick={submitClickHandler}>Continue</button>
      </div>
    </div>
  );
};

export default ResetPassword;
