const express = require("express");
const blogModel = require("../models/blog-model");
const { upload } = require("../config/multer-config");
const isAuth = require("../middleware/isAuth");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("user", "-password");
    res.send({
      success: true,
      message: "Blogs Fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/:blogId", isAuth, async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogModel.findById(blogId).populate("user", "-password");

    res.send({
      success: true,
      message: "Blogs Fetched successfully",
      blog: blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/user/:userId", isAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    const blogs = await blogModel
      .find({ user: userId })
      .populate("user", "-password");

    res.send({
      success: true,
      message: "Blogs Fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
router.post("/", isAuth, async (req, res) => {
  try {
    let user = req.user;

    let blogs = await blogModel
      .find({ user: user._id })
      .populate("user", "-password");

    res.send({
      success: true,
      message: "Blogs Added Successfully.",
      blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
// router.get("/invoices", isAuth, async (req, res) => {
//   try {
//     let user = req.user;
//     let invoices = await invoiceModel.find({ user: user._id });
//     res.send({
//       success: true,
//       message: "invoice Fetched successfully",
//       invoice: invoices,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// });
router.post("/add-blog", isAuth, upload.single("file"), async (req, res) => {
  try {
    let user = req.user;

    let blog = await new blogModel({
      blog_title: req.body.blog_title,
      blog_image: `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`,
      blog_description: req.body.blog_description,
      user: user._id,
    });
    await blog.save();
    const users = await userModel.findById(user._id);
    users.blogs.push(blog._id);
    await users.save();

    res.send({
      success: true,
      message: "Blogs Added Successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
router.post("/edit-blog", isAuth, upload.single("file"), async (req, res) => {
  try {
    let user = req.user;
    let blog = await blogModel.findById(req.body.blogId);

    if (!blog) {
      return res.send({ success: false, message: "Blog not found" });
    } else if (blog.user === user._id) {
      return res.send({ success: false, message: "Unauthorised access" });
    }
    blog.blog_title = req.body.blog_title;
    blog.blog_description = req.body.blog_description;
    if (req.body.blog_image) {
      blog.blog_image = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
    }
    await blog.save();

    const users = await userModel.findById(user._id);
    users.blogs.push(blog._id);
    await users.save();

    res.send({
      success: true,
      message: "Blogs Added Successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});
router.post("/delete-blog", isAuth, async (req, res) => {
  try {
    let user = req.user;

    if (user._id.toString() === req.body.user._id) {
      let blog = await blogModel.findOneAndDelete({
        _id: req.body._id,
      });
      // await userModel.findByIdAndUpdate(blog.user, {
      //   $pull: { blogs: req.body._id },
      // });

      let blogs = await blogModel
        .find({ user: user._id })
        .populate("user", "-password");
      res.send({
        success: true,
        message: "Blog Deleted Successfully.",
        blogs,
      });
    } else {
      console.error(user._id.toString(), req.body.user._id);
      res.send({
        success: false,
        message: "Blog Delete Unsuccessfully.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
