const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

require("dotenv").config();

mongoose
  .connect(`${process.env.MONGODB_URI}/blogs`)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("err: ", err);
  });

module.exports = mongoose.connection;
