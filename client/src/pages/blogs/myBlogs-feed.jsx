import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UNSAFE_DataWithResponseInit, useNavigate } from "react-router-dom";
import { setBlogs } from "../../redux/User/actions";
import BlogCard from "./blog-card";
import axios from "axios";
import BlogsFeed from "./blogs-feed";

const MyBlogsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { User } = useSelector((state) => state);

  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchingBlogs = async () => {
    const token = localStorage.getItem("token");

    try {
      const blogs = await axios.post(
        "http://localhost:8080/blogs",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (blogs.data.success) {
        setBlogs(blogs.data.blogs);
        setIsFetching(false);
      } else {
        console.error("Error fetching data:", blogs.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchingBlogs();
  }, []);

  const deleteBlog = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const blogs = await axios.post(
        "http://localhost:8080/blogs/delete-blog",
        { _id: e._id, user: e.user },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (blogs.data.success) {
        setBlogs(blogs.data.blogs);
      } else {
        console.error("Error fetching data:", blogs.data.message);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };
  const editBlog = (blog) => {
    navigate("/blog/" + blog._id);
  };

  return (
    <div className="card-body">
      <div>
        <button
          onClick={(e) => {
            navigate("/my-blogs/add");
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>
      <BlogsFeed
        blogs={blogs}
        editable={true}
        editBlog={editBlog}
        deleteBlog={deleteBlog}
        isFetching={isFetching}
      />
    </div>
  );
};

export default MyBlogsPage;
