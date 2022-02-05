import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateReview.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors, getProductDetail } from "../../actions/productAction";
import MetaData from "../layouts/MetaData";

const CreateReview = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, product, loading } = useSelector((state) => state.product);

  const [rating, setRating] = useState(0);
  const headlineRef = useRef();
  const reviewRef = useRef();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }

    dispatch(getProductDetail(id));
  }, [error, alert, dispatch, id]);

  const submitReview = () => {
    console.log(rating, headlineRef.current.value, reviewRef.current.value);
  };

  return (
    <div>
    <MetaData title="Review your Purchase"/>
      <div className={styles.profile_div}>
        <div className={styles.profile_innerDiv}>
          <div className={styles.user_avatar}>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX50_.png"
              alt="user_avatar_image"
            />
          </div>
          <p>Aniket</p>
        </div>
      </div>
      <div className={styles.main_div}>
        {loading ? (
          <Loader />
        ) : product.name ? (
          <div className={styles.prod_info}>
            <h2>Create Review</h2>
            <div className={styles.product}>
              <div className={styles.product_img}>
                <img src={product.images[0].url} alt="product_img" />
              </div>
              <p>{product.name}</p>
            </div>
          </div>
        ) : (
          <p>Some error occured, try refreshing the page.</p>
        )}
        <hr className={styles.custom_hr} />
        <div className={styles.overall_rating}>
          <h3>Overall rating</h3>
          <ReactStars
            color="rgba(20,20,20,0.1)"
            activeColor="#FFA41C"
            size={45}
            onChange={(rating) => setRating(rating)}
          />
        </div>
        <hr className={styles.custom_hr} />
        <div className={styles.headline}>
          <h3>Add a headline</h3>
          <input
            type="text"
            placeholder="What's most important to know?"
            ref={headlineRef}
          />
        </div>
        <hr className={styles.custom_hr} />
        <div className={styles.review}>
          <h3>Add a written review</h3>
          <textarea
            placeholder="What did you like or dislike? What did you use this product for?"
            ref={reviewRef}
          />
        </div>
        <hr className={styles.custom_hr} />
        <div className={styles.submit_div}>
          <button className={styles.submit_btn} onClick={submitReview}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
