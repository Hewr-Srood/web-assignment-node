
const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};
const userSchema = new mongoose.Schema({
  username: reqString,
  password: reqString,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
