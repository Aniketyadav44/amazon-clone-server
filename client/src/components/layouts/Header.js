import React, { useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../images/amazon-white.png";
import cartIcon from "../../images/cart_icon.png";
import searchIcon from "../../images/search_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Header = () => {
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const alert = useAlert();

  useEffect(() => {}, []);

  const searchClickHandler = () => {
    if (searchInput.current.value.trim()) {
      navigate(`/search/${searchInput.current.value}`);
    } else {
      //to change to / ..this is for only dev purpose
      navigate("/search");
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.info("Logged out successfully");
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
        <div className={styles.accountBtn}>
          <p>
            Hello, {isAuthenticated ? user.name : "Sign in"} <br />
            <span>Account & Lists</span>
          </p>
          <div className={styles.dropdown}>
            {!isAuthenticated && (
              <>
                <div className={styles.auth_div}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign in
                  </button>
                  <p>
                    New customer?{" "}
                    <span
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      start here.
                    </span>
                  </p>
                </div>
                <hr className={styles.custom_hr} />
              </>
            )}
            <h3>Your Account</h3>
            <Link className={styles.dropdown_link} to="/account">
              <p>Your account</p>
            </Link>
            <Link className={styles.dropdown_link} to="/orders">
              <p>Your orders</p>
            </Link>
            {isAuthenticated && user.role === "admin" && (
              <Link className={styles.dropdown_link} to="/admin">
                <p>Admin dashboard</p>
              </Link>
            )}
            <hr className={styles.custom_hr} />
            {isAuthenticated && (
              <p className={styles.dropdown_link} onClick={logoutHandler}>
                Sign out
              </p>
            )}
          </div>
        </div>
        <div style={{ minWidth: "100px" }}>
          <Link style={{ textDecoration: "none" }} to="/orders">
            <p className={styles.ordersBtn_p}>
              Returns <br />
              <span>& Orders</span>
            </p>
          </Link>
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
