import { createSlice } from "@reduxjs/toolkit";

type User = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  id?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  userInfo: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStates: function (state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const AuthReducer = authSlice.reducer;
export const authActions = authSlice.actions;
