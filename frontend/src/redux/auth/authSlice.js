import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "./authThunk";
import { jwtDecode } from "jwt-decode";

const initialState = {
  data: [],
  token: null,
  expire: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setExpire: (state, action) => {
      state.expire = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const decode = jwtDecode(action.payload.accessToken);
        return {
          ...state,
          loading: false,
          token: action.payload.accessToken,
          expire: decode.exp,
        };
      })
      .addCase(refreshToken.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;
export { authActions, authReducer };
export default authSlice;
