import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";

export default combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});
