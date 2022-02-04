import React, { useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../images/amazon-white.png";
import cartIcon from "../../images/cart_icon.png";
import searchIcon from "../../images/search_icon.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const searchClickHandler = () => {
    if (searchInput.current.value.trim()) {
      navigate(`/search/${searchInput.current.value}`);
    } else {
      //to change to / ..this is for only dev purpose
      navigate("/search");
    }
  };
  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} to="/">
        <img src={logo} alt="amazon_logo" />
      </Link>
      <div className={styles.search}>
        <input
          type="text"
          ref={searchInput}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchClickHandler();
            }
          }}
        />
        <button className={styles.searchBtn} onClick={searchClickHandler}>
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
