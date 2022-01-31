import React from "react";
import CategoryNav from "../CategoryNav";
import Header from "../Header";
import styles from "./Home.module.css";
import CarouselComp from "../CarouselComp";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <CategoryNav />
      <CarouselComp />
    </div>
  );
};

export default Home;
