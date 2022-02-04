import React, { useRef, useState } from "react";
import styles from "./Signin.module.css";
import logo from "../../images/amazon.png";
import { Link } from "react-router-dom";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const signIn = () => {
    setEmailError(false);
    setPassError(false);
    if (emailRef.current.value === "") {
      setEmailError(true);
      return;
    }
    if (passwordRef.current.value === "") {
      setPassError(true);
      return;
    }
    console.log("creating user");
  };

  return (
    <div className={styles.signin}>
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <p>Sign-In</p>
        <label className={styles.label}>
          Email <input type="text" ref={emailRef} />
        </label>
        {emailError && (
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            Enter your email.
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
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            Enter your password.
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
        <button className={styles.createBtn}>Create your Amazon account</button>
      </Link>
    </div>
  );
};

export default Signin;
