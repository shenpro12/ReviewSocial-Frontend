import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import provinceReducer from "./reducer/provinceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    province: provinceReducer,
  },
});
