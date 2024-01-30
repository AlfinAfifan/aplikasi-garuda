import { createSlice } from "@reduxjs/toolkit";
import { getUtama } from "./utamaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const utamaSlice = createSlice({
  name: "utama",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUtama.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getUtama.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getUtama.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: utamaActions, reducer: utamaReducer } = utamaSlice;
export default utamaSlice;
