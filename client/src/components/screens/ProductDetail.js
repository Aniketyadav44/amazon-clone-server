import React, { useEffect, useState, useRef } from "react";
import { getProductDetail } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import styles from "./ProductDetail.module.css";
import MetaData from "../layouts/MetaData";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import dateFormat from "dateformat";

const rating_stars_options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "#FFA41C",
  isHalf: true,
  size: 24,
};

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const { loading, error, product, reviewData } = useSelector(
    (state) => state.product
  );
  const { id } = useParams();
  const alert = useAlert();

  const [selectedImage, setSelectedImage] = useState(0);
  const quantityRef = useRef();

  useEffect(() => {
    if (error) {
      alert.error(error.toString());
      return;
    }
    dispatch(getProductDetail(id));
  }, [dispatch, error, id, alert]);

  const addToCartHandler = () => {
    console.log(quantityRef.current.value);
  };

  const buyNowHandler = () => {
    console.log(quantityRef.current.value);
  };

  return (
    <div className={styles.product_page}>
      <MetaData title="Product" />
      {loading && product.name ? (
        <Loader />
      ) : (
        <div className={styles.main_div}>
          <MetaData title={product.name} />
          <div className={styles.left_col}>
            <div className={styles.side_images}>
              {product.images &&
                product.images.map((image, index) => {
                  return (
                    <div
                      key={image._id}
                      className={`${styles.side_image_div} ${
                        index === selectedImage && styles.side_image_div_hover
                      }`}
                      onMouseOver={() => setSelectedImage(index)}
                    >
                      <img
                        alt="product_image"
                        className={styles.side_image}
                        src={image.url}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={styles.main_image_div}>
              {product.images && (
                <ReactImageMagnify
                  className={styles.main_image}
                  {...{
                    smallImage: {
                      alt: "product_image",
                      isFluidWidth: true,
                      src: product.images[selectedImage].url,
                    },
                    largeImage: {
                      src: product.images[selectedImage].url,
                      width: 1800,
                      height: 1800,
                      isFluidWidth: true,
                    },
                    enlargedImageContainerDimensions: {
                      width: "150%",
                      height: "120%",
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div className={styles.center_col}>
            <p style={{ fontSize: "24px", lineHeight: "32px" }}>
              {product.name}
            </p>
            <div className={styles.ratingDiv}>
              <ReactStars value={product.ratings} {...rating_stars_options} />
              <p>{product.reviews && product.reviews.length} reviews</p>
            </div>
            <hr className={styles.custom_hr} />
            <table>
              <tbody>
                <tr>
                  <td className={styles.td_style}>M.R.P.:</td>
                  <td
                    style={{
                      textAlign: "left",
                      textDecoration: "line-through",
                    }}
                    className={styles.td_style}
                  >{`₹${product.mrp}`}</td>
                </tr>
                <tr>
                  <td className={styles.td_style}>Price:</td>
                  <td
                    style={{
                      textAlign: "left",
                      fontSize: "18px",
                      color: "#B12704",
                    }}
                  >{`₹${product.discountedMrp}`}</td>
                </tr>
                <tr>
                  <td className={styles.td_style}>You Save:</td>
                  <td
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      color: "#B12704",
                    }}
                  >{`₹${product.mrp - product.discountedMrp} (${Math.round(
                    ((product.mrp - product.discountedMrp) * 100) / product.mrp
                  )})%`}</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ fontSize: "15px" }}> Inclusive of all taxes</td>
                </tr>
              </tbody>
            </table>
            <hr className={styles.custom_hr} />
            <p className={styles.desc_heading}>About this item</p>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.right_col}>
            <span className={styles.quantity_selector}>
              <label htmlFor="quantity">Quantity:</label>
              <select name="quantity" ref={quantityRef} defaultValue={"1"}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </span>
            <hr style={{ marginTop: "20px" }} className={styles.custom_hr} />
            <button className={styles.addToCartBtn} onClick={addToCartHandler}>
              Add to Cart
            </button>
            <button className={styles.buyBtn} onClick={buyNowHandler}>
              Buy Now
            </button>
          </div>
        </div>
      )}
      {product.name && (
        <>
          <hr
            style={{ marginLeft: "20px", marginRight: "20px" }}
            className={styles.custom_hr}
          />
          <div className={styles.reviews_div}>
            <div className={styles.reviews_left}>
              <p style={{ fontWeight: "700", fontSize: "24px" }}>
                Customer reviews
              </p>
              <div className={styles.reviewRatingDiv}>
                <ReactStars value={product.ratings} {...rating_stars_options} />
                <p>{product.ratings} out of 5</p>
              </div>
              <p style={{ color: "#565959", fontSize: "14px" }}>
                {product.reviews.length} reviews
              </p>
              {reviewData && (
                <table>
                  <tbody>
                    <tr>
                      <td className={styles.table_text}>5 star</td>
                      <td>
                        <div className={styles.review_bar} />
                      </td>
                      <td>
                        <div
                          style={{ width: `${reviewData.star5percent * 2}px` }}
                          className={styles.review_fill_bar}
                        />
                      </td>
                      <td className={styles.table_text}>
                        {reviewData.star5percent}%
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.table_text}>4 star</td>
                      <td>
                        <div className={styles.review_bar} />
                      </td>
                      <td>
                        <div
                          style={{ width: `${reviewData.star4percent * 2}px` }}
                          className={styles.review_fill_bar}
                        />
                      </td>
                      <td className={styles.table_text}>
                        {reviewData.star4percent}%
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.table_text}>3 star</td>
                      <td>
                        <div className={styles.review_bar} />
                      </td>
                      <td>
                        <div
                          style={{ width: `${reviewData.star3percent * 2}px` }}
                          className={styles.review_fill_bar}
                        />
                      </td>
                      <td className={styles.table_text}>
                        {reviewData.star3percent}%
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.table_text}>2 star</td>
                      <td>
                        <div className={styles.review_bar} />
                      </td>
                      <td>
                        <div
                          style={{ width: `${reviewData.star2percent * 2}px` }}
                          className={styles.review_fill_bar}
                        />
                      </td>
                      <td className={styles.table_text}>
                        {reviewData.star2percent}%
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.table_text}>1 star</td>
                      <td>
                        <div className={styles.review_bar} />
                      </td>
                      <td>
                        <div
                          style={{ width: `${reviewData.star1percent * 2}px` }}
                          className={styles.review_fill_bar}
                        />
                      </td>
                      <td className={styles.table_text}>
                        {reviewData.star1percent}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              <hr style={{ marginTop: "20px" }} className={styles.custom_hr} />
              <h3 style={{ fontSize: "18px", paddingBottom: "4px" }}>
                Review this product
              </h3>
              <p style={{ fontSize: "14px", marginBottom: "16px" }}>
                Share your thoughts with other customers
              </p>
              <button className={styles.write_review_btn}>
                Write a product review
              </button>
              <hr style={{ marginTop: "30px" }} className={styles.custom_hr} />
            </div>
            <div className={styles.reviews_right}>
              {product.reviews &&
                product.reviews.map((r) => {
                  return (
                    <div key={r._id} className={styles.review_item}>
                      <div className={styles.review_item_header}>
                        <div className={styles.user_avatar}>
                          <img src={r.avatar.url} alt="user_avatar_image" />
                        </div>
                        <div className={styles.user_name}>
                          <p>{r.name}</p>
                        </div>
                      </div>
                      <div className={styles.review_item_starDiv}>
                        <ReactStars
                          value={product.ratings}
                          {...rating_stars_options}
                          size={20}
                        />
                        <p>{r.commentTitle}</p>
                      </div>
                      <p className={styles.reviewed_on}>
                        Reviewed on{" "}
                        {dateFormat(new Date(r.reviewdOn), "dd mmmm yyyy")}
                      </p>
                      <p className={styles.review_comment}>{r.commentBody}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
