import React from "react";
import styles from "./OrderItem.module.css";
import dateFormat from "dateformat";
import { Link, useNavigate } from "react-router-dom";

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.order_item}>
      <div className={styles.first}>
        <div className={styles.detailDiv}>
          <p className={styles.heading}>ORDER PLACED</p>
          <p className={styles.text}>
            {dateFormat(new Date(order.createdAt), "dd mmmm yyyy")}
          </p>
        </div>
        <div className={styles.detailDiv}>
          <p className={styles.heading}>TOTAL</p>
          <p className={styles.text}>₹{order.totalPrice}</p>
        </div>
        <div className={styles.detailDiv}>
          <p className={styles.heading}>SHIP TO</p>
          <p className={styles.text}>{order.user.name}</p>
        </div>
        <div style={{ marginLeft: "350px" }} className={styles.detailDiv}>
          <p className={styles.heading}>ORDER # {order._id}</p>
          {/* <p className={styles.detailsBtn}>View order details</p> */}
        </div>
      </div>
      <div className={styles.second}>
        {order.deliveredAt && (
          <p className={styles.deliveredText}>
            Delivered {dateFormat(new Date(order.deliveredAt), "dd-mmm-yyyy")}
          </p>
        )}
        {order.orderItems.map((item) => {
          return (
            <div key={item._id} className={styles.orderDetails}>
              <div className={styles.leftDiv}>
                <div className={styles.detailsRow}>
                  <div className={styles.imageDiv}>
                    <img alt="product_image" src={item.image} />
                  </div>
                  <div className={styles.textDiv}>
                    <Link
                      to={`/product/${item._id}`}
                      className={styles.productLink}
                    >
                      <p>{item.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.rightDiv}>
                <button
                  className={styles.write_review_btn}
                  onClick={() => {
                    navigate(`/create-review/${item._id}`);
                  }}
                >
                  Write a product review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItem;
