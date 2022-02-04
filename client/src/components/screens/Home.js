import React, { useEffect } from "react";
import styles from "./Home.module.css";
import CarouselComp from "../layouts/CarouselComp";
import Product from "../layouts/Product";
import MetaData from "../layouts/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <div className={styles.home}>
      <MetaData title="Amazon Clone" />
      <CarouselComp />
      <div className={styles.home_products}>
        <h2>All Products</h2>
        {loading ? (
          <Loader />
        ) : (
          products.map((p) => {
            return <Product key={p._id} product={p} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;
