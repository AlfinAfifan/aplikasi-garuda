import { createSlice } from "@reduxjs/toolkit";
import { createUtama, deleteUtama, getUtama, getUtamaId, getYearUtama } from "./utamaThunk";

const initialState = {
  data: [],
  dataById: [],
  yearList: [],
  loading: false,
  loadingById: false,
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
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearUtama.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getYearUtama.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          yearList: action.payload,
          type: action.type,
        };
      })
      .addCase(getYearUtama.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getUtamaId.pending, (state, action) => {
        return {
          ...state,
          loadingById: true,
          type: action.type,
        };
      })
      .addCase(getUtamaId.fulfilled, (state, action) => {
        return {
          ...state,
          loadingById: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getUtamaId.rejected, (state, action) => {
        return {
          ...state,
          loadingById: false,
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
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteUtama.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteUtama.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteUtama.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: utamaActions, reducer: utamaReducer } = utamaSlice;
export default utamaSlice;
