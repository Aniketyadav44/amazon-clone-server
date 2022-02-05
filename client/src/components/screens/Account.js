import React from "react";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const Account = () => {
  return (
    <div className={styles.account_div}>
    <MetaData title="Your Account"/>
      <h1>Your Account</h1>
      <div className={styles.table}>
        <Link to="/orders">
          <div className={styles.table_cell}>
            <div className={styles.cell_inner}>
              <div className={styles.cell_image}>
                <img
                  alt="Your Orders"
                  src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                />
              </div>
              <div className={styles.cell_text_div}>
                <h2>Your Orders</h2>
                <div className={styles.text_div}>
                  <span>Track, return, or buy things again</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/edit-account">
          <div className={styles.table_cell}>
            <div className={styles.cell_inner}>
              <div className={styles.cell_image}>
                <img
                  alt="Login &amp; security"
                  src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
                />
              </div>
              <div className={styles.cell_text_div}>
                <h2>Login &amp; security</h2>
                <div className={styles.text_div}>
                  <span>Edit login, name, and mobile number</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/edit-addresses">
          <div className={styles.table_cell}>
            <div className={styles.cell_inner}>
              <div className={styles.cell_image}>
                <img
                  alt="Your Addresses"
                  src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
                />
              </div>
              <div className={styles.cell_text_div}>
                <h2>Your Addresses</h2>
                <div className={styles.text_div}>
                  <span>Edit addresses for orders and gifts</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Account;
