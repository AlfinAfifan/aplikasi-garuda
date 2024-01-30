import { createSlice } from "@reduxjs/toolkit";
import { getMadya } from "./madyaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const madyaSlice = createSlice({
  name: "madya",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMadya.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getMadya.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: madyaActions, reducer: madyaReducer } = madyaSlice;
export default madyaSlice;
