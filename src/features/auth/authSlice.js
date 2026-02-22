import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {
    registerSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    logoutSuccess(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
    refreshStart(state) {
      state.isRefreshing = true;
    },
    refreshSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    refreshError(state) {
      state.isRefreshing = false;
    },
  },
});

export const {
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  refreshStart,
  refreshSuccess,
  refreshError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
