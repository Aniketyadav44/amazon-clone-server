const User = require("../models/userModel");
const sendToken = require("../utils/sendJWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//creating new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, res, 200);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(500)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    sendToken(user, res, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({ success: true, message: "Logout Successfully" });
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get logged in user
exports.getLoggedinUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//to send email for forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = user.getResetToken();
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Link to reset your password is:\n\n${resetPasswordUrl}\n\nIf you have not requested to reset your password, then please ignore this mail.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Amazon clone Password Recovery`,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully.`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      await user.save();
      res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//to reset password when the link from forgot password mail is clicked
exports.resetPassword = async (req, res) => {
  try {
    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Reset password token invalid or expired, try again.",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Entered password and Confirm password doesn't match",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();

    sendToken(user, res, 200); //loggin in user, means simply sending the jwt token via cookies
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update password for logged in users
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(
      req.body.enteredPassword
    );
    if (!isPasswordMatched) {
      return res.status(500).json({
        success: false,
        message: "Wrong password entered.",
      });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Entered password and Confirm password doesn't match",
      });
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, res, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update user profile
exports.updateProfile = async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//updating user and it's role
exports.updateUserRole = async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newData);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//deleting user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
