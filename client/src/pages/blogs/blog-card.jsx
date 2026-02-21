import React, { useState } from "react";
import { RiDeleteBinLine, RiPencilFill } from "@remixicon/react";
import { useNavigate, useParams } from "react-router-dom";

const BlogCard = ({ blog, editable, deleteBlog, editBlog, isAuthorEnable }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div
      className={`card rounded-lg ${
        isProcessing ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {editable && (
        <div className="flex justify-end text-red-500">
          <RiPencilFill
            size={26}
            color="white"
            onClick={() => {
              editBlog();
              setIsProcessing(true);
            }}
            className={`${
              isProcessing
                ? "cursor-not-allowed animate-pulse"
                : "cursor-pointer"
            }`}
          />
          <RiDeleteBinLine
            size={26}
            color="rgb(239 68 68)"
            onClick={() => {
              deleteBlog();
              setIsProcessing(true);
            }}
            className={`${
              isProcessing
                ? "cursor-not-allowed animate-pulse"
                : "cursor-pointer"
            }`}
          />
        </div>
      )}
      <div className="blog-content-wrapper ">
        <img
          src={blog.blog_image}
          // src={`data:${
          //   blog.blog_image_ext
          // };base64,${blog.blog_image.data.toString("base64")}`}
          alt="User Avatar"
          style={{
            height: "300px",
            width: "500px",
            objectFit: "cover",
            border: "2px solid #ccc",
            marginBottom: "10px",
          }}
          // validate={{ required: true }}
        />
        <div className="blog-info flex-1 ml-3">
          <div className="font-extrabold mb-3">{blog.blog_title}</div>
          {isAuthorEnable === true && (
            <div className="text-zinc-400 mb-3">
              <span className="font-light">By </span>
              <span
                className="font-bold text-green-500 cursor-pointer"
                onClick={() => {
                  if (blog.user._id) {
                    navigate("/blogs/" + blog.user._id);
                  }
                }}
              >
                {blog.user.fullname}
              </span>
            </div>
          )}
          <div className="font-light">
            {blog.blog_description.length > 850
              ? `${blog.blog_description.slice(0, 850)}...`
              : blog.blog_description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
