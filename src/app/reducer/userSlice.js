import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  profile: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = true;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.profile = {};
    },
  },
});
export const { login, logout } = userSlice.actions;
export const isLogin = (state) => state.user.login;
export const getProfile = (state) => state.user.profile;

export default userSlice.reducer;
