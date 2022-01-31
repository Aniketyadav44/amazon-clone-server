import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./layouts/Home.module.css";

import img1 from "../images/carousel_images/1.jpg";
import img2 from "../images/carousel_images/2.jpg";
import img3 from "../images/carousel_images/3.jpg";
import img4 from "../images/carousel_images/4.jpg";
import img5 from "../images/carousel_images/5.jpg";
import img6 from "../images/carousel_images/6.jpg";

const CarouselComp = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      stopOnHover
    >
      <div>
        <img className={styles.carousel_image} src={img1} alt="carousel_1" />
      </div>
      <div>
        <img className={styles.carousel_image} src={img2} alt="carousel_1" />
      </div>
      <div>
        <img className={styles.carousel_image} src={img3} alt="carousel_1" />
      </div>
      <div>
        <img className={styles.carousel_image} src={img4} alt="carousel_1" />
      </div>
      <div>
        <img className={styles.carousel_image} src={img5} alt="carousel_1" />
      </div>
      <div>
        <img className={styles.carousel_image} src={img6} alt="carousel_1" />
      </div>
    </Carousel>
  );
};

export default CarouselComp;
