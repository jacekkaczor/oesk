import { combineReducers } from "redux";
import urls from "./urls";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  urls,
  errors,
  messages
});
