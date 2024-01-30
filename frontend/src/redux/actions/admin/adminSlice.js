import { createSlice } from "@reduxjs/toolkit";
import { getAdmin } from "./adminThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getAdmin.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: adminActions, reducer: adminReducer } = adminSlice;
export default adminSlice;
