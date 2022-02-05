import React, { useEffect, useRef, useState } from "react";
import styles from "./Signin.module.css";
import logo from "../../images/amazon.png";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login } from "../../actions/userAction";
import Loader from "../layouts/Loader/Loader";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState("");
  const [passErrorText, setPassErrorText] = useState("");

  const alert = useAlert();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
      return;
    }

    if(isAuthenticated){
      navigate("/account")
    }
  }, [error, alert, dispatch,isAuthenticated, navigate]);

  console.log("user", user);

  const signIn = () => {
    setEmailError(false);
    setPassError(false);
    setEmailErrorText("");
    setPassErrorText("");
    const inputEmail = emailRef.current.value;
    const inputPassword = passwordRef.current.value;
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
    dispatch(login(inputEmail, inputPassword));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.signin}>
          <img className={styles.logo} src={logo} alt="amazon_logo" />
          <div className={styles.box}>
            <p>Sign-In</p>
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
            <p className={styles.forgotp}>
              <Link
                style={{ color: "#0066c0", textDecoration: "none" }}
                to="/forgot-password"
              >
                Forgot Password
              </Link>
            </p>
            <label className={styles.label}>
              Password <input type="password" ref={passwordRef} />
            </label>
            {passError && (
              <p
                style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}
              >
                {passErrorText}
              </p>
            )}
            <button className={styles.button} onClick={signIn}>
              Sign-In
            </button>
            <p style={{ fontSize: "15px", marginBottom: "25px" }}>
              By continuing, you agree to Amazon's{" "}
              <span style={{ color: "#0066c0" }}>Conditions of Use</span> and{" "}
              <span style={{ color: "#0066c0" }}>Privacy Notice.</span>
            </p>
          </div>
          <div className={styles.guide}>New to Amazon?</div>
          <Link to="/signup">
            <button className={styles.createBtn}>
              Create your Amazon account
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signin;
