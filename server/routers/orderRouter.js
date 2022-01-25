const express = require("express");
const {
  createOrder,
  getSingleOrder,
  userOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/order").post(isAuthenticated, createOrder);

router
  .route("/order/:id")
  .get(isAuthenticated, getSingleOrder)
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

router.route("/my/orders").get(isAuthenticated, userOrders);

router
  .route("/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

module.exports = router;
