const app = require("./app");
const cloudinary = require("cloudinary");

//dotenv config
require("dotenv").config();

//connecting database
const connectDatabase = require("./config/database");
connectDatabase();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//listening app
app.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
