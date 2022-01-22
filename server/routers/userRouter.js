const express = require("express");
const { createUser, getAllUsers, getUser } = require("../controllers/user");

const router = express.Router();

router.route("/new/user").post(createUser);

router.route("/users").get(getAllUsers);

router.route("/user/:id").get(getUser);

module.exports = router;
