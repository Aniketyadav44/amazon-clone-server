import React from "react";
import CategoryNav from "../CategoryNav";
import Header from "../Header";
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <CategoryNav />
    </div>
  );
};

export default Home;
