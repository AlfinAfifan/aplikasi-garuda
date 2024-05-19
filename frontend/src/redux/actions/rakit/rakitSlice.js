import { createSlice } from "@reduxjs/toolkit";
import { createRakit, deleteRakit, getOptionRakit, getRakit, getYearRakit } from "./rakitThunk";

const initialState = {
  data: [],
  yearList: [],
  loading: false,
  errorCreate: false,
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
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getOptionRakit.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getOptionRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getOptionRakit.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearRakit.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getYearRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          yearList: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearRakit.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
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
          loading: false,
          errorCreate: true,
          type: action.type,
        };
      })
      .addCase(deleteRakit.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteRakit.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteRakit.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          errorCreate: true,
          type: action.type,
        };
      });
  },
});

export const { actions: rakitActions, reducer: rakitReducer } = rakitSlice;
export default rakitSlice;
