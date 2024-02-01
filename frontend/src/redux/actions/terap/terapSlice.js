import { createSlice } from "@reduxjs/toolkit";
import { createTerap, getTerap } from "./terapThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
  type: "",
};

const terapSlice = createSlice({
  name: "terap",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTerap.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getTerap.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getTerap.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createTerap.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createTerap.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createTerap.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: terapActions, reducer: terapReducer } = terapSlice;
export default terapSlice;
