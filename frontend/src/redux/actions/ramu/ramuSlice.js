import { createSlice } from "@reduxjs/toolkit";
import { getRamu } from "./ramuThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const ramuSlice = createSlice({
  name: "ramu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRamu.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getRamu.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getRamu.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: ramuActions, reducer: ramuReducer } = ramuSlice;
export default ramuSlice;
