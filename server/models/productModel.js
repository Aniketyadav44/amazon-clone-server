const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  mrp: {
    type: Number,
    required: [true, "Please enter product mrp"],
  },
  discountedMrp: {
    type: String,
    required: [true, "Please enter discounted mrp of product"],
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock amount"],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: [true, "Please enter review comment"],
      },
      rating: {
        type: Number,
        required: [true, "Please enter the rating"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);