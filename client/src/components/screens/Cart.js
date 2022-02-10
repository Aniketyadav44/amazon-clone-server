import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { addItemToCart, removeFromCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const alert = useAlert();

  const addToCartHandler = (id, value) => {
    dispatch(addItemToCart(id, value));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartLength = cartItems.length;

  return (
    <div className={styles.mainDiv}>
      <MetaData title="Cart" />
      <div className={styles.leftDiv}>
        <h1>Shopping Cart</h1>
        <p className={styles.priceText}>Price</p>
        <hr className={styles.custom_hr} />
        {cartItems.length === 0 ? (
          <p style={{ marginTop: "10px" }}>Your cart is empty</p>
        ) : (
          <div className={styles.cartItemDiv}>
            {cartItems.map((i) => {
              return (
                <div key={i.product} className={styles.cartItem}>
                  <div className={styles.ciDetails}>
                    <div className={styles.imgDiv}>
                      <img src={i.image} alt="product_image" />
                    </div>
                    <div className={styles.ciDetailsInfo}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/product/${i.product}`}
                      >
                        <p className={styles.name}>{i.name}</p>
                      </Link>

                      {i.stock > 0 ? (
                        <p className={styles.inStock}>In Stock</p>
                      ) : (
                        <p className={styles.outOfStock}>Out of Stock</p>
                      )}
                      <div className={styles.options}>
                        <span className={styles.quantity_selector}>
                          <select
                            name="quantity"
                            defaultValue={i.quantity}
                            onChange={(e) => {
                              if (i.stock < e.target.value) {
                                alert.error(
                                  "Selected amount of product not available in stock."
                                );
                                e.target.value = i.quantity;
                                return;
                              }
                              addToCartHandler(i.product, e.target.value);
                            }}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                          </select>
                          <p className={styles.quantity_selector_label}>Qty:</p>
                        </span>
                        <p style={{ color: "#ddd" }}>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                        </p>
                        <p
                          onClick={() => {
                            removeFromCartHandler(i.product);
                          }}
                          className={styles.delete}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ciPrice}>
                    <p>₹{i.price}</p>
                  </div>
                </div>
              );
            })}
            <p
              style={{ marginTop: "5px", textAlign: "right" }}
              className={styles.subtotalText}
            >
              Subtotal ({cartLength} {cartLength > 1 ? "items" : "item"}):
              <span style={{ fontWeight: "700" }}>₹{totalPrice}</span>
            </p>
          </div>
        )}
      </div>
      <div className={styles.rightDiv}>
        <p className={styles.subtotalText}>
          Subtotal ({cartLength} {cartLength > 1 ? "items" : "item"}):
          <span style={{ fontWeight: "700" }}>₹{totalPrice}</span>
        </p>
        <button>Proceed to Buy</button>
      </div>
    </div>
  );
};

export default Cart;
