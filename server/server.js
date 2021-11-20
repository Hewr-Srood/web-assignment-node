require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log("Successfully connected!"))
  .catch((err) => console.log("We got an error which is ", err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
