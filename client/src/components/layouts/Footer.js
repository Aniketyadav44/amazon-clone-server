import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="#top">
        <div className={styles.btt}>
          <p>Back to top</p>
        </div>
      </a>
      <div
        style={{
          display: "table",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "table-row", margin: "0 40px" }}>
          <div className={styles.table_cell}>
            <div className={styles.table_cell_head}>Get to Know Us</div>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Cares</li>
              <li>Gift a Smile</li>
              <li>Amazon</li>
            </ul>
          </div>
          <div style={{ width: "10%" }} className={styles.table_cell} />
          <div className={styles.table_cell}>
            <div className={styles.table_cell_head}>Connect with Us</div>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div style={{ width: "10%" }} className={styles.table_cell} />
          <div className={styles.table_cell}>
            <div className={styles.table_cell_head}>Make Money with Us</div>
            <ul>
              <li>Sell on Amazon</li>
              <li>Sell under Amazon Accelerator</li>
              <li>Amazon Global Selling</li>
              <li>Become an Affiliate</li>
              <li>Fulfilment by Amazon</li>
              <li>Amazon Pay on Merchants</li>
            </ul>
          </div>
          <div style={{ width: "10%" }} className={styles.table_cell} />
          <div className={styles.table_cell}>
            <div className={styles.table_cell_head}>Let Us Help You</div>
            <ul>
              <li>COVID-19 and Amazon</li>
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>100% Purchase Protection</li>
              <li>Amazon App Download</li>
              <li>Amazon Assistant Download</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer_line} />
      <div className={styles.footer_bottom}>
        <p style={{ marginBottom: "20px" }}>
          Amazon Clone created by Aniket Yadav.
        </p>
        <div>
          <a
            href="https://anikety.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
          <a
            href="https://www.linkedin.com/in/aniketyadav4848/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/aniket.codes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://github.com/Aniketyadav44"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://twitter.com/AniketY8888"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <p>aniani4848@gmail.com</p>
        </div>
      </div>
      <div className={styles.footer_bottom_div}>

      </div>
    </div>
  );
};

export default Footer;
