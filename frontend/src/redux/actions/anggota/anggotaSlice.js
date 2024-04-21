import { createSlice } from "@reduxjs/toolkit";
import {
  createAnggota,
  deleteAnggota,
  getAnggota,
  getAnggotaById,
  updateAnggota,
} from "./anggotaThunk";

const initialState = {
  data: [],
  dataById: {},
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
      .addCase(getAnggotaById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getAnggotaById.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          dataById: action.payload,
        };
      })
      .addCase(getAnggotaById.rejected, (state, action) => {
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
      })
      .addCase(updateAnggota.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(updateAnggota.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          data: action.payload,
        };
      })
      .addCase(updateAnggota.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        }
      })
      .addCase(deleteAnggota.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteAnggota.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          type: action.type,
          data: action.payload,
        };
      })
      .addCase(deleteAnggota.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        }
      });
  },
});

const { actions: anggotaActions, reducer: anggotaReducer } = anggotaSlice;
export { anggotaActions, anggotaReducer };
export default anggotaSlice;
