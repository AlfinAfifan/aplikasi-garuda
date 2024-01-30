import { createSlice } from "@reduxjs/toolkit";
import { getPurwa } from "./purwaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const purwaSlice = createSlice({
  name: "purwa",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPurwa.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getPurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getPurwa.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: purwaActions, reducer: purwaReducer } = purwaSlice;
export default purwaSlice;
