import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import styles from "./Product.module.css";

const rating_stars_options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "#FFA41C",
  value: "3.5",
  isHalf: true,
  size: 24,
};

const Product = (props) => {
  return (
    <div className={styles.product_item}>
      <div className={styles.product_img_div}>
        <Link to="/">
          <img
            className={styles.product_img}
            alt="."
            src="https://m.media-amazon.com/images/I/71Y8rH2cJiL._AC_UY327_FMwebp_QL65_.jpg"
          />
        </Link>
      </div>
      <div>
        <div className={styles.product_right}>
          <Link className={styles.name} to="/">
            <p>{props.product.name}</p>
          </Link>
          <ReactStars {...rating_stars_options} />
          <p>
            <span
              style={{
                color: "#b12704",
                fontSize: "10px",
                verticalAlign: "super",
              }}
            >
              ₹
            </span>
            <span className={styles.mrp}>{props.product.mrp}</span>{" "}
            <span className={styles.discountedMrp}>
              {`₹${props.product.discountedMrp}`}
            </span>{" "}
            <span className={styles.discount}>
              Save ₹
              <span>{props.product.mrp - props.product.discountedMrp}</span> (
              {((props.product.mrp - props.product.discountedMrp) * 100) /
                props.product.mrp}
              )%
            </span>
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "100",
              color: "#0F1111",
              marginTop: "5px",
            }}
          >
            FREE Delivery by Amazon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
