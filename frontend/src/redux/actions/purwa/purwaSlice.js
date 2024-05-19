import { createSlice } from "@reduxjs/toolkit";
import { createPurwa, deletePurwa, getOptionPurwa, getPurwa, getPurwaId, getYearPurwa } from "./purwaThunk";

const initialState = {
  data: [],
  yearList: [],
  dataById: [],
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
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getOptionPurwa.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getOptionPurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getOptionPurwa.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearPurwa.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getYearPurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          yearList: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearPurwa.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getPurwaId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getPurwaId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getPurwaId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
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
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deletePurwa.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deletePurwa.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deletePurwa.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: purwaActions, reducer: purwaReducer } = purwaSlice;
export default purwaSlice;
