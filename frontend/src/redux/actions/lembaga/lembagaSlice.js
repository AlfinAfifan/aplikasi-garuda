import { createSlice } from "@reduxjs/toolkit";
import { getLembaga } from "./lembagaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const lembagaSlice = createSlice({
  name: "lembaga",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLembaga.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getLembaga.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getLembaga.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { actions: lembagaActions, reducer: lembagaReducer } =
  lembagaSlice;
export default lembagaSlice;
