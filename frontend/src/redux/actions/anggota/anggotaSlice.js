import { createSlice } from "@reduxjs/toolkit";
import { createAnggota, getAnggota, getAnggotaId } from "./anggotaThunk";

const initialState = {
  data: [],
  dataById: [],
  loading: false,
  error: null,
  type: "",
};

const anggotaSlice = createSlice({
  name: "anggota",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAnggota.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getAnggota.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          data: action.payload,
        };
      })
      .addCase(getAnggota.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getAnggotaId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getAnggotaId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          dataById: action.payload,
        };
      })
      .addCase(getAnggotaId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createAnggota.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createAnggota.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          data: action.payload,
        };
      })
      .addCase(createAnggota.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

const { actions: anggotaActions, reducer: anggotaReducer } = anggotaSlice;
export { anggotaActions, anggotaReducer };
export default anggotaSlice;
