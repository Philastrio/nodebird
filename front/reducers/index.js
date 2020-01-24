import { combineReducers } from "redux";
import UserReducer from "./user";
import PostReducer from "./post";

const rootReducer = combineReducers({
  UserReducer,
  PostReducer
});

export default rootReducer;
