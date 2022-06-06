const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")

const app = express();

//app configs
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload())

//using routers
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

module.exports = app;
