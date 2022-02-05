import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import styles from "./EditAddresses.module.css";

const EditAddresses = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return <div className={styles.mainDiv}>
     <div className={styles.routesDiv}>
     <MetaData title="Your Addresses"/>
        <p
          className={styles.routesDiv_p}
          onClick={() => {
            navigate("/account");
          }}
        >
          Your Account&nbsp;
        </p>
        <p style={{ fontSize: "14px", color: "black" }}>{"> "}</p>
        <p> &nbsp;Your Addresses</p>
      </div>
      <h1>Your Addresses</h1>
  </div>;
};

export default EditAddresses;
