const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

//creating new product
exports.createProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//getting all products
exports.getAllProducts = async (req, res) => {
  try {
    const resultsPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultsPerPage);

    products = await apiFeature.query.clone();

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultsPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//getting single product by passing product id in params
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("createdBy");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    let star5 = 0;
    let star4 = 0;
    let star3 = 0;
    let star2 = 0;
    let star1 = 0;

    product.reviews.forEach((r) => {
      r.rating === 5 && star5++;
      r.rating === 4 && star4++;
      r.rating === 3 && star3++;
      r.rating === 2 && star2++;
      r.rating === 1 && star1++;
    });
    const reviewData = {
      star5percent: (star5 / product.reviews.length) * 100,
      star4percent: (star4 / product.reviews.length) * 100,
      star3percent: (star3 / product.reviews.length) * 100,
      star2percent: (star2 / product.reviews.length) * 100,
      star1percent: (star1 / product.reviews.length) * 100,
    };
    res.status(200).json({ success: true, product, reviewData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//editing/updating product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//deleting product by id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//create/update produtct review
exports.createReview = async (req, res) => {
  try {
    const { commentTitle, commentBody, rating, productId } = req.body;
    const review = {
      avatar: req.user.avatar,
      name: req.user.name,
      commentTitle,
      commentBody,
      rating: Number(rating),
    };

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    let isAlreadyReviewed = false;
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        isAlreadyReviewed = true;
      }
    });

    if (isAlreadyReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating),
            (rev.commentTitle = commentTitle),
            (rev.commentBody = commentBody);
        }
      });
    } else {
      product.reviews.push(review);
    }
    let ratingSum = 0;
    product.reviews.forEach((rev) => {
      ratingSum += rev.rating;
    });
    product.ratings = ratingSum / product.reviews.length;
    await product.save();

    res.status(200).json({ success: true, message: "Reviewed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete review
exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedReviewsArray = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    product.reviews = updatedReviewsArray;
    let ratingSum = 0;
    updatedReviewsArray.forEach((rev) => {
      ratingSum += rev.rating;
    });
    product.ratings = ratingSum / updatedReviewsArray.length;
    await product.save();
    res
      .status(500)
      .json({ success: true, message: "Product review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
