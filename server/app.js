const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//app configs
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using routers
const productRouter = require("./routers/productRouter");

app.use("/api/v1", productRouter);

module.exports = app;
