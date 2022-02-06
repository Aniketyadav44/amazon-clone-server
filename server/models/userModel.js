const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email"],
    required: [true, "Please enter your email"],
    unique: [true.valueOf, "Email already registered"],
  },
  phone: {
    type: Number,
    length: [10, "Please enter valid phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password must be atleast 6 characters long"],
    select: false,
  },
  address: [
    {
      name: String,
      phone: Number,
      pincode: Number,
      country: String,
      flat: String,
      area: String,
      landmark: String,
      city: String,
      state: String,
      defaultAddress: Boolean,
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
});

//hashing the password whenever it is changed
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//method to create jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//for comparing the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//creating password reset token
userSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", userSchema);
