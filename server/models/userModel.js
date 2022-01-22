const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email"],
    required: [true, "Please enter your email"],
    unique: [true.valueOf,"Email already registered"],
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
  address: {
    type: String,
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
