import React from "react";
import styles from "./Signin.module.css";
import logo from "../../images/amazon.png";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className={styles.signin}>
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <p>Sign-In</p>
        <label className={styles.label}>
          Email <input type="text" />
        </label>
        <p className={styles.forgotp}>Forgot Password</p>
        <label className={styles.label}>
          Password <input type="password" />
        </label>
        <button className={styles.button}>Sign-In</button>
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
