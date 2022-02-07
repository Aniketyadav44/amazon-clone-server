import React, { useEffect, useRef, useState } from "react";
import styles from "./ForgotPassword.module.css";
import logo from "../../../images/amazon.png";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../../layouts/MetaData";
import { clearErrors, forgotPassword } from "../../../actions/userAction";

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState([false, ""]);
  const email = useRef();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
      return;
    }
    if (loading) {
      alert.info("Sending reset password link to your email");
    }
    if (!loading && message) {
      alert.success(message);
    }
  }, [error, alert, message, dispatch, loading]);

  const submitClickHandler = () => {
    setEmailError([false, ""]);
    const inputEmail = email.current.value;
    if (!inputEmail) {
      setEmailError([true, "Enter your email."]);
      return;
    }
    if (!validator.isEmail(inputEmail)) {
      setEmailError([true, "Enter a valid email."]);
      return;
    }
    dispatch(forgotPassword(inputEmail));
  };

  return (
    <div className={styles.forgotp}>
      <MetaData title="Forgot Password" />
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <h1>Password assistance</h1>
        <p>Enter the email address associated with your Amazon account.</p>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={email} />
        {emailError[0] && (
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            {emailError[1]}
          </p>
        )}
        <button onClick={submitClickHandler}>Continue</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
