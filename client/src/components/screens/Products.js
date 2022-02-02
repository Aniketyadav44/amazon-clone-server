import React, { useEffect, useRef, useState } from "react";
import styles from "./Products.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import Product from "../layouts/Product";
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component";

const rating_stars_options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "#FFA41C",
  isHalf: true,
  size: 25,
};

const Products = () => {
  const { keyword } = useParams();
  const {
    loading,
    products,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000000]);
  const [rating, setRating] = useState([0, 5]);
  const lowPrice = useRef();
  const highPrice = useRef();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return;
    }

    dispatch(getProduct(keyword, currentPage, price, rating));
  }, [alert, error, keyword, dispatch, currentPage, price, rating]);

  const submitPriceRange = (e) => {
    e.preventDefault();
    const lp = lowPrice.current.value;
    const hp = highPrice.current.value;
    lowPrice.current.value = "";
    highPrice.current.value = "";
    if (lp === "" || hp === "" || isNaN(lp) || isNaN(hp)) {
      alert.error("Please enter a valid price range");
      return;
    }
    setPrice([parseInt(lp), parseInt(hp)]);
  };

  return (
    <div>
      <MetaData title={keyword} />
      {filteredProductsCount ? (
        <div className={styles.pageHeader}>
          <p>
            Showing results 1
            {filteredProductsCount > resultsPerPage && (
              <span>-{resultsPerPage}</span>
            )}{" "}
            of <span>{filteredProductsCount}</span> for{"  "}
            <span style={{ color: "#c45500" }}>"{keyword}"</span>
          </p>
        </div>
      ) : (
        <p className={styles.errp}>
          No results found, try searching using other keywords.
        </p>
      )}
      <div className={styles.products}>
        <div className={styles.filter}>
          <p style={{ marginBottom: "5px", fontSize: "16px" }}>Price Range</p>
          <div className={styles.priceRange}>
            <p
              onClick={() => {
                setPrice([0, 20000]);
              }}
            >
              Under ₹20,000
            </p>
            <p
              onClick={() => {
                setPrice([20000, 30000]);
              }}
            >
              ₹20,000 – ₹30,000
            </p>
            <p
              onClick={() => {
                setPrice([30000, 40000]);
              }}
            >
              ₹30,000 – ₹40,000
            </p>
            <p
              onClick={() => {
                setPrice([40000, 50000]);
              }}
            >
              ₹40,000 – ₹50,000
            </p>
            <p
              onClick={() => {
                setPrice([50000, 100000000]);
              }}
            >
              Over ₹50,000
            </p>
            <div className={styles.customPrice}>
              <form onSubmit={submitPriceRange}>
                <input
                  maxLength={9}
                  type="text"
                  placeholder="Min"
                  ref={lowPrice}
                />
                <input
                  maxLength={9}
                  type="text"
                  placeholder="Max"
                  ref={highPrice}
                />
                <button>Go</button>
              </form>
              <p className={styles.rs1}>₹</p>
              <p className={styles.rs2}>₹</p>
            </div>
          </div>
          <p style={{ fontSize: "16px", marginTop: "20px" }}>Customer Review</p>
          <div
            className={styles.starDiv}
            onClick={() => {
              setRating([4, 5]);
            }}
          >
            <ReactStars {...rating_stars_options} value={4} />
            <p>& Up</p>
          </div>
          <div
            className={styles.starDiv}
            onClick={() => {
              setRating([3, 5]);
            }}
          >
            <ReactStars {...rating_stars_options} value={3} />
            <p>& Up</p>
          </div>
          <div
            className={styles.starDiv}
            onClick={() => {
              setRating([2, 5]);
            }}
          >
            <ReactStars {...rating_stars_options} value={2} />
            <p>& Up</p>
          </div>
          <div
            style={{ marginBottom: "40px" }}
            className={styles.starDiv}
            onClick={() => {
              setRating([1, 5]);
            }}
          >
            <ReactStars {...rating_stars_options} value={1} />
            <p>& Up</p>
          </div>
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {products && productsCount ? (
                <div>
                  {products.map((p) => {
                    return <Product key={p._id} product={p} />;
                  })}
                </div>
              ) : (
                <p>No Products Found!</p>
              )}
              {filteredProductsCount > resultsPerPage && (
                <div className={styles.paginationBox}>
                  <Pagination
                    className={styles.pagination}
                    activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={filteredProductsCount}
                    onChange={(e) => {
                      setCurrentPage(e);
                    }}
                    nextPageText="Next"
                    prevPageText="Previous"
                    itemClass={styles.itemClass}
                    linkClass={styles.linkClass}
                    activeClass={styles.activeClass}
                    activeLinkClass={styles.activeLinkClass}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
