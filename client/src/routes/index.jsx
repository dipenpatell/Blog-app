import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import Logout from "../pages/auth/logout";
import BlogForm from "../pages/blogs/blogs-form";
import MyBlogsPage from "../pages/blogs/myBlogs-feed";
import BlogsPage from "../pages/blogs/blogs-home";
import UserBlogsPage from "../pages/blogs/blogs-user";

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // path="/blogs/:blogId"
  { path: "/blogs/:userId", component: <UserBlogsPage /> },
  { path: "/blog/:blogId", component: <BlogForm /> },
  { path: "my-blogs/add", component: <BlogForm /> },
  { path: "/my-blogs", component: <MyBlogsPage /> },
  { path: "/blogs", component: <BlogsPage /> },
  { path: "*", component: <Navigate to="/blogs" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/logout", component: <Logout /> },
];

export { authProtectedRoutes, publicRoutes };
