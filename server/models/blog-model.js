const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  blog_title: {
    type: String,
  },
  blog_image_ext: {
    type: String,
  },
  blog_image: {
    type: String,
  },
  blog_description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("blog", blogSchema);
