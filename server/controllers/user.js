const User = require("../models/userModel");

//creating new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
