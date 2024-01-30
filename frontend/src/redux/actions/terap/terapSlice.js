import { createSlice } from "@reduxjs/toolkit";
import { getTerap } from "./terapThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
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
        };
      })
      .addCase(getTerap.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getTerap.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: terapActions, reducer: terapReducer } = terapSlice;
export default terapSlice;
