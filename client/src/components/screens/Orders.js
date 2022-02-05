import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderItem from "../layouts/OrderItem";
import styles from "./Orders.module.css";
import MetaData from "../layouts/MetaData";

const order = [
  {
    _id: "61f7d8954494cdsa06089b52a6a",
    shippingInfo: {
      address: "Rm 54, Laxmi Nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pinCode: 400104,
      phoneNo: 1234567890,
    },
    orderItems: [
      {
        name: "2020 Apple MacBook Pro (13.3-inch/33.78 cm, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 512GB SSD) - Space Grey",
        price: 20000,
        quantity: 2,
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/31p014p14mL._SY90_.jpg",
        product: "61ecd27f2dee3f35aaa01140",
        _id: "61f7d8954494c06089b52a6a",
      },
      {
        name: "Xiaomi Mi Smart Band 6, 50% Larger 1.56 AMOLED Screen, SpO2 Tracking, Continuous HR, Stress and Sleep Monitoring, 30 Sports Modes, PAI, Women's Health, Quick Replies, 5ATM Water Resistant, Black",
        price: 20000,
        quantity: 2,
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/31p014p14mL._SY90_.jpg",
        product: "61ecd27f2dee3f35aaa01140",
        _id: "61f7d7fb4494c06089b52a60",
      },
    ],
    user: {
      name: "Aniket",
      email: "aniani484@gmail.com",
    },
    paymentInfo: { id: "sample payment info", status: "Succeeded" },
    paidAt: "2022-01-25T15:44:02.708Z",
    itemsPrice: 20000,
    taxPrice: 360,
    shippingPrice: 100,
    totalPrice: 20460,
    orderStatus: "Delivered",
    createdAt: "2022-01-25T15:44:02.713Z",
    __v: 0,
    deliveredAt: "2022-01-25T15:47:08.308Z",
  },
  {
    _id: "61f0gs1ac2e9986aef3664e4c9",
    shippingInfo: {
      address: "Rm 54, Laxmi Nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pinCode: 400104,
      phoneNo: 1234567890,
    },
    orderItems: [
      {
        name: "Honor 9N",
        price: 20000,
        quantity: 2,
        image:
          "https://images-eu.ssl-images-amazon.com/images/I/41KKyYw5hyS._SX90_.jpg",
        product: "61ecd27f2dee3f35aaa01140",
        _id: "61f01ac2e9986aef3664e4ca",
      },
    ],
    user: {
      name: "ASY",
      email: "aniani484@gmail.com",
    },
    paymentInfo: { id: "sample payment info", status: "Succeeded" },
    paidAt: "2022-01-25T15:44:02.708Z",
    itemsPrice: 20000,
    taxPrice: 360,
    shippingPrice: 100,
    totalPrice: 20460,
    orderStatus: "Delivered",
    createdAt: "2022-01-25T15:44:02.713Z",
    __v: 0,
    deliveredAt: "2022-01-25T15:47:08.308Z",
  },
];

const Orders = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.mainDiv}>
    <MetaData title="Your Orders"/>
      <div className={styles.routesDiv}>
        <p
          className={styles.routesDiv_p}
          onClick={() => {
            navigate("/account");
          }}
        >
          Your Account&nbsp;
        </p>
        <p style={{ fontSize: "14px", color: "black" }}>{"> "}</p>
        <p> &nbsp;Your Orders</p>
      </div>
      <h1>Your Orders</h1>
      <hr className={styles.custom_hr} />
      <p className={styles.orderinfo_text}>
        <span>
          {order.length} {order.length > 1 ? "orders" : "order"}
        </span>{" "}
        placed
      </p>
      <div className={styles.orderDiv}>
        {order.map((o) => {
          return <OrderItem key={o._id} order={o} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
