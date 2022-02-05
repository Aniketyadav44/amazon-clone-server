const app = require("./app");

//dotenv config
require("dotenv").config();

//connecting database
const connectDatabase = require("./config/database");
connectDatabase();



//listening app
app.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
