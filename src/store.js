import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/reducer/userSlice/userSlice";
import userSlice from "../src/reducer/userSlice/userSlice";

export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
  },
});
