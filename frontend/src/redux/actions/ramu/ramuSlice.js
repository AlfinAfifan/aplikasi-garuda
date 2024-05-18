import { createSlice } from "@reduxjs/toolkit";
import { createRamu, deleteRamu, getRamu, getYearRamu } from "./ramuThunk";

const initialState = {
  data: [],
  yearList: [],
  loading: false,
  error: null,
  type: "",
};

const ramuSlice = createSlice({
  name: "ramu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRamu.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getRamu.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getRamu.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearRamu.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getYearRamu.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          yearList: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearRamu.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createRamu.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createRamu.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createRamu.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteRamu.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteRamu.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteRamu.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: ramuActions, reducer: ramuReducer } = ramuSlice;
export default ramuSlice;
