import { createSlice } from "@reduxjs/toolkit";
import { createUtama, getUtama } from "./utamaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
  type: "",
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
          type: action.type,
        };
      })
      .addCase(getUtama.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getUtama.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createUtama.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createUtama.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createUtama.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: utamaActions, reducer: utamaReducer } = utamaSlice;
export default utamaSlice;
