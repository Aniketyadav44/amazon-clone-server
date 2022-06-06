const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  deleteProfile,
  updateUserRole,
  getLoggedinUser,
} = require("../controllers/user");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/new/user").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/users").get(getAllUsers);

router
  .route("/user/:id")
  .get(isAuthenticated, getUser)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProfile);

router.route("/me").get(isAuthenticated, getLoggedinUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").post(resetPassword);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/user/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/user/update/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole);

module.exports = router;
