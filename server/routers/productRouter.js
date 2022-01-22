const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.route("/new/product").post(createProduct);

router.route("/products").get(getAllProducts);
router
  .route("/product/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
