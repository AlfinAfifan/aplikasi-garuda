import { createSlice } from "@reduxjs/toolkit";
import { createPurwa, getPurwa } from "./purwaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
  type: "",
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
          type: action.type,
        };
      })
      .addCase(getPurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getPurwa.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createPurwa.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createPurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createPurwa.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: purwaActions, reducer: purwaReducer } = purwaSlice;
export default purwaSlice;
