import React from "react";
import CategoryNav from "../layouts/CategoryNav";
import Header from "../layouts/Header";
import styles from "./Home.module.css";
import CarouselComp from "../layouts/CarouselComp";
import Product from "../layouts/Product";
import MetaData from "../layouts/MetaData";

const product = [
  {
    name: "Honor Y6",
    _id: "hello",
    mrp: 20000,
    discountedMrp: 16000,
    description: "This is a band by Huawei",
    category: "Smart Phone",
  },
  {
    name: "Honor Y6",
    _id: "hello",
    mrp: 20000,
    discountedMrp: 15500,
    description: "This is a band by Huawei",
    category: "Smart Phone",
  },
];

const Home = () => {
  return (
    <div className={styles.home}>
      <MetaData title="Amazon Clone" />
      <Header />
      <CategoryNav />
      <CarouselComp />
      <div className={styles.home_products}>
        <h2>All Products</h2>
        {product.map((p) => {
          return <Product product={p} />;
        })}
      </div>
    </div>
  );
};

export default Home;
