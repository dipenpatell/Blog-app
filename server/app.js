const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require("./config/mongoose-connection");

const blogsRouters = require("./routers/blog-router");
const usersRouters = require("./routers/user-router");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use("/blogs", blogsRouters);
app.use("/user", usersRouters);

app.listen(8080);
