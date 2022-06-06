const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log("MongoDB connected successfully");
  });
};
