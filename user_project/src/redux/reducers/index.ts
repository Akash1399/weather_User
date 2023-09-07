// src/reducers/index.ts
import { combineReducers } from "redux";
import userReducer from "./userReducers";

const rootReducer = combineReducers({
  users: userReducer, // This should match the key you use when accessing it in useSelector
});

export default rootReducer;
