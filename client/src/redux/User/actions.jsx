import { SET_BLOGS } from "./actionTypes";

export const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  payload: blogs,
});
