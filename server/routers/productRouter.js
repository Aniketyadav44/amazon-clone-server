const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createReview,
  deleteReview,
} = require("../controllers/product");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/new/product")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

router.route("/products").get(getAllProducts);
router
  .route("/product/:id")
  .get(getProduct)
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router
  .route("/review")
  .post(isAuthenticated, createReview)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
