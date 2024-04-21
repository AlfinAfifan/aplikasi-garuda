import { createSlice } from "@reduxjs/toolkit";
import {
  createLembaga,
  deleteLembaga,
  getLembaga,
  getLembagaById,
  updateLembaga,
} from "./lembagaThunk";

const initialState = {
  data: [],
  dataById: {},
  loading: false,
  error: null,
  type: "",
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
          type: action.type,
        };
      })
      .addCase(getLembaga.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getLembaga.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getLembagaById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getLembagaById.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getLembagaById.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createLembaga.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createLembaga.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createLembaga.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(updateLembaga.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateLembaga.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(updateLembaga.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteLembaga.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteLembaga.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteLembaga.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: lembagaActions, reducer: lembagaReducer } =
  lembagaSlice;
export default lembagaSlice;
