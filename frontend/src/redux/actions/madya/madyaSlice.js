import { createSlice } from "@reduxjs/toolkit";
import { createMadya, deleteMadya, getMadya, getMadyaId } from "./madyaThunk";

const initialState = {
  data: [],
  dataById: [],
  loading: false,
  error: null,
  type: "",
};

const madyaSlice = createSlice({
  name: "madya",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMadya.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getMadya.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getMadyaId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getMadyaId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getMadyaId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createMadya.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createMadya.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteMadya.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteMadya.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteMadya.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
  },
});

export const { actions: madyaActions, reducer: madyaReducer } = madyaSlice;
export default madyaSlice;
