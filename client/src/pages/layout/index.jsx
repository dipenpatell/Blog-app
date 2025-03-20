import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UNSAFE_DataWithResponseInit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { setBlogs } from "../../redux/User/actions";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState("");

  useEffect(() => {
    if (location.pathname.split("/")[1] === "blogs") {
      setCurrentNav("all_blogs");
    }
    if (location.pathname.split("/")[1] === "my-blogs") {
      setCurrentNav("my_blogs"); //border-b-[2px] border-solid border-green-900
    }
  }, [location]);

  return (
    <div className="bg-zinc-900 h-screen gap-5 p-5 flex flex-col">
      <div className="navbar">
        <div className="flex gap-3">
          <h4
            className={`text-2xl text-white ${
              currentNav === "all_blogs" ? "active-nav" : ""
            }`}
            onClick={() => navigate("/blogs")}
          >
            Blogs
          </h4>
          <h4
            className={`text-2xl text-white ${
              currentNav === "my_blogs" ? "active-nav" : ""
            }`}
            onClick={() => navigate("/my-blogs")}
          >
            My Blogs
          </h4>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              localStorage.setItem("token", "");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex w-full flex-1 overflow-hidden justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
