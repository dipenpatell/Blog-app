// @flow
import { SET_BLOGS } from "./actionTypes";

const INIT_STATE = {
  blogs: [],
};

const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

export default User;
