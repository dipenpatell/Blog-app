import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlogs } from "../../redux/User/actions";
import axios from "axios";
import BlogsFeed from "./blogs-feed";

const BlogsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { User } = useSelector((state) => state);

  const [isFetching, setIsFetching] = useState(true);

  const fetchingBlogs = async () => {
    const token = localStorage.getItem("token");

    try {
      const blogs = await axios.get("http://localhost:8080/blogs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (blogs.data.success) {
        dispatch(setBlogs(blogs.data.blogs));
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

  return (
    <div className="card-body">
      <BlogsFeed
        isFetching={isFetching}
        blogs={User.blogs}
        isAuthorEnable={true}
      />
    </div>
  );
};

export default BlogsPage;
