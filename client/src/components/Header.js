import React from "react";
import styles from "./Header.module.css";
import logo from "../images/amazon-white.png";

const Header = () => {
  return (
    <div className={styles.navbar}>
      <img
        className={styles.logo}
        src={logo}
        alt="amazon_logo"
      />
      <div className={styles.search}>
        <button className={styles.catBtn}>Cat</button>
        <input type="text" />
        <button className={styles.searchBtn}>Sea</button>
      </div>
      <div className={styles.links}>
        <div>
          <p>Account</p>
        </div>
        <div>
          <p>Orders</p>
        </div>
        <div>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
