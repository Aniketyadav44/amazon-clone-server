const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res  
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          success: false,
          message: `Role:${req.user.role} is not authorized to access`,
        });
    }
    next();
  };
};
