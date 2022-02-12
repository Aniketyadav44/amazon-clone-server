import React, { useEffect } from "react";
import styles from "./Checkout.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const Checkout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return <div>
    <MetaData title=""/>Checkout
  </div>;
};

export default Checkout;
