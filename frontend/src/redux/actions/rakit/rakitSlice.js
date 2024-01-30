import { createSlice } from "@reduxjs/toolkit";
import { getRakit } from "./rakitThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const rakitSlice = createSlice({
  name: "rakit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRakit.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getRakit.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: rakitActions, reducer: rakitReducer } = rakitSlice;
export default rakitSlice;
