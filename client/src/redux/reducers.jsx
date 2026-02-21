import { combineReducers } from "redux";
import User from "./User/reducer";

const rootReducer = combineReducers({
  User,
});

export default rootReducer;
