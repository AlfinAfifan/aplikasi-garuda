import { createSlice } from "@reduxjs/toolkit";
import { createRakit, getRakit } from "./rakitThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
  type: "",
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
          type: action.type,
        };
      })
      .addCase(getRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getRakit.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createRakit.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createRakit.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: rakitActions, reducer: rakitReducer } = rakitSlice;
export default rakitSlice;
