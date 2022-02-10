import React from "react";
import styles from "./Loader.module.css";
import loadinggif from "../../../images/loading.gif";

const Loader = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.loading}>
        <img src={loadinggif} alt="loader" />
      </div>
      <div className={styles.overwrap}></div>
    </div>
  );
};

export default Loader;
