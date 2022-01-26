import React from "react";
import styles from "./Signup.module.css";
import logo from "../../images/amazon.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className={styles.signup}>
      <img className={styles.logo} src={logo} alt="amazon_logo" />
      <div className={styles.box}>
        <p>Create Account</p>
        <label className={styles.label}>
          Your name <input type="text" />
        </label>

        <label className={styles.label}>
          Mobile number <input type="text" />
        </label>

        <label className={styles.label}>
          Email <input type="text" />
        </label>

        <label className={styles.label}>
          Password <input type="password" />
        </label>
        <p style={{ fontSize: "15px", marginTop: "0px", color: "#2B2B2B" }}>
          Passwords must be at least 6 characters.
        </p>
        <button className={styles.button}>Continue</button>
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
