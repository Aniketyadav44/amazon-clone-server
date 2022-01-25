const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");

const router = express.Router();

router.route("/new/user").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/users").get(getAllUsers);

router.route("/user/:id").get(getUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").post(resetPassword);


module.exports = router;
