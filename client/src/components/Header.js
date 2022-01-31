import React from "react";
import styles from "./Header.module.css";
import logo from "../images/amazon-white.png";
import cartIcon from "../images/cart_icon.png";
import searchIcon from "../images/search_icon.png";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} to="/">
        <img src={logo} alt="amazon_logo" />
      </Link>
      <div className={styles.search}>
        <input type="text" />
        <button className={styles.searchBtn}>
          <img src={searchIcon} alt="search_icon" />
        </button>
      </div>
      <div className={styles.links}>
        <div style={{ minWidth: "150px" }}>
          <p>
            Hello, Aniket <br />
            <span>Account & Lists</span>
          </p>
        </div>
        <div style={{ minWidth: "100px" }}>
          <p>
            Returns <br />
            <span>& Orders</span>
          </p>
        </div>
        <div style={{ minWidth: "100px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5px",
              height: "50px ",
            }}
          >
            <div>
              <p
                style={{
                  width: "fit-content",
                  margin: "auto",
                  marginBottom: "-28px",
                  color: "#F08804",
                }}
              >
                0
              </p>
              <img
                style={{ width: "53px", height: "51px", marginRight: "10px" }}
                src={cartIcon}
                alt="cart_icon"
              />
            </div>
            <p
              style={{
                marginTop: "23px",
                fontSize: "15px",
                height: "fit-content",
                marginLeft: "-15px",
              }}
            >
              Cart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
