const app = require("./app");

//dotenv config
require("dotenv").config();

//listening app
app.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
