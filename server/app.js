const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//app configs
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
