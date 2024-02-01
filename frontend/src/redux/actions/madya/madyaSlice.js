import { createSlice } from "@reduxjs/toolkit";
import { createMadya, getMadya } from "./madyaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
  type: "",
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
          type: action.type,
        };
      })
      .addCase(getMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getMadya.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createMadya.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createMadya.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: madyaActions, reducer: madyaReducer } = madyaSlice;
export default madyaSlice;
