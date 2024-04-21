import { createSlice } from "@reduxjs/toolkit";
import {
  createJenisTkk,
  deleteJenisTkk,
  getJenisTkk,
  getJenisTkkById,
  updateJenisTkk,
} from "./jenisTkkThunk";

const initialState = {
  data: [],
  dataById: [],
  loading: false,
  error: null,
  type: "",
};

const jenisTkkSlice = createSlice({
  name: "jenisTkk",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getJenisTkk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getJenisTkk.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getJenisTkk.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getJenisTkkById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getJenisTkkById.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getJenisTkkById.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createJenisTkk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createJenisTkk.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createJenisTkk.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(updateJenisTkk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(updateJenisTkk.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(updateJenisTkk.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteJenisTkk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteJenisTkk.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteJenisTkk.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      });
  },
});

const { actions: jenisTkkActions, reducer: jenisTkkReducer } = jenisTkkSlice;
export { jenisTkkActions, jenisTkkReducer };
export default jenisTkkSlice;
