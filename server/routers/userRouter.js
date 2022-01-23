const express = require("express");
const { createUser, getAllUsers, getUser, loginUser, logoutUser } = require("../controllers/user");

const router = express.Router();

router.route("/new/user").post(createUser);

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/users").get(getAllUsers);

router.route("/user/:id").get(getUser);

//work on editing user, reset password, json web token genration, loggin in user etc

module.exports = router;
