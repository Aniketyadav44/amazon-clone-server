import React, { useEffect, useRef, useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../images/amazon.png";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userAction";
import Loader from "../layouts/Loader/Loader";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passErrorText, setPassErrorText] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [error, alert, dispatch, navigate, isAuthenticated]);

  const signup = () => {
    setNameError(false);
    setEmailError(false);
    setPassError(false);
    setEmailErrorText("");
    setPassErrorText("");
    const inputEmail = emailRef.current.value;
    const inputPassword = passRef.current.value;

    if (nameRef.current.value === "") {
      setNameError(true);
      return;
    }
    if (inputEmail === "") {
      setEmailError(true);
      setEmailErrorText("Enter your email.");
      return;
    }
    if (inputPassword === "") {
      setPassError(true);
      setPassErrorText("Enter your password.");
      return;
    }
    if (!validator.isEmail(inputEmail)) {
      setEmailError(true);
      setEmailErrorText("Enter a valid email.");
      return;
    }
    if (inputPassword.length < 6) {
      setPassError(true);
      setPassErrorText("Password must be at least 6 characters.");
      return;
    }
    dispatch(register(nameRef.current.value, inputEmail, inputPassword));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.signup}>
          <img className={styles.logo} src={logo} alt="amazon_logo" />
          <div className={styles.box}>
            <p>Create Account</p>
            <label className={styles.label}>
              Your name <input type="text" ref={nameRef} />
            </label>
            {nameError && (
              <p
                style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}
              >
                Enter your name.
              </p>
            )}

            <label className={styles.label}>
              Mobile number(Optional) <input type="text" ref={phoneRef} />
            </label>

            <label className={styles.label}>
              Email <input type="text" ref={emailRef} />
            </label>
            {emailError && (
              <p
                style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}
              >
                {emailErrorText}
              </p>
            )}

            <label className={styles.label}>
              Password <input type="password" ref={passRef} />
            </label>
            <p style={{ fontSize: "15px", marginTop: "0px", color: "#2B2B2B" }}>
              Password must be at least 6 characters.
            </p>
            {passError && (
              <p
                style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}
              >
                {passErrorText}
              </p>
            )}

            <button className={styles.button} onClick={signup}>
              Continue
            </button>
            <p
              style={{
                fontSize: "15px",
                color: "#2B2B2B",
                marginBottom: "25px",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: "#0066c0",
                  cursor: "pointer",
                }}
              >
                Sign in {">"}
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
