import React, { useRef, useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../images/amazon.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const signup = () => {
    setNameError(false);
    setEmailError(false);
    setPassError(false);
    if (nameRef.current.value === "") {
      setNameError(true);
      return;
    }
    if (emailRef.current.value === "") {
      setEmailError(true);
      return;
    }
    if (passRef.current.value === "") {
      setPassError(true);
      return;
    }
    console.log("creating user");
  };

  return (
    <div className={styles.signup}>
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <p>Create Account</p>
        <label className={styles.label}>
          Your name <input type="text" ref={nameRef} />
        </label>
        {nameError && (
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
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
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            Enter your email.
          </p>
        )}

        <label className={styles.label}>
          Password <input type="password" ref={passRef} />
        </label>
        <p style={{ fontSize: "15px", marginTop: "0px", color: "#2B2B2B" }}>
          Passwords must be at least 6 characters.
        </p>
        {passError && (
          <p style={{ fontSize: "15px", marginTop: "0px", color: "#D55500" }}>
            Enter your password.
          </p>
        )}

        <button className={styles.button} onClick={signup}>
          Continue
        </button>
        <p style={{ fontSize: "15px", color: "#2B2B2B", marginBottom: "25px" }}>
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
  );
};

export default Signup;
