import React, { Fragment } from "react";
import BlogCard from "./blog-card";

const BlogsFeed = ({
  blogs,
  editable,
  isAuthorEnable,
  editBlog,
  deleteBlog,
  isFetching,
}) => {
  return (
    <Fragment>
      {isFetching ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 overflow-auto scrollbar-hide">
          {blogs.map((e) => (
            <BlogCard
              editable={editable ? editable : false}
              blog={e}
              deleteBlog={() => deleteBlog(e)}
              isAuthorEnable={isAuthorEnable ? isAuthorEnable : true}
              editBlog={() => editBlog(e)}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default BlogsFeed;
