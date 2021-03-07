import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: cookie.value,
  },

  reducers: {
    //Login Action
    login: (state, action) => {
      state.user = action.payload;
    },
    //Logout action
    logout: (state) => {
      state.user = null;
    },
    //Register action
    register: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
