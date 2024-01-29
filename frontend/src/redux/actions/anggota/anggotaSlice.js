import { createSlice } from "@reduxjs/toolkit";
import { getAnggota } from "./anggotaThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
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
        };
      })
      .addCase(getAnggota.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getAnggota.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: anggotaActions, reducer: anggotaReducer } = anggotaSlice;
export { anggotaActions, anggotaReducer };
export default anggotaSlice;
