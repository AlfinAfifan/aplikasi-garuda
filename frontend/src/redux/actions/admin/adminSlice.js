import { createSlice } from "@reduxjs/toolkit";
import { createAdmin, deleteAdmin, getAdmin, getAdminById, updateAdmin } from "./adminThunk";

const initialState = {
  data: [],
  dataById: {},
  loading: false,
  error: null,
  type: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(getAdmin.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(getAdminById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          dataById: action.payload,
          type: action.type,
        };
      })
      .addCase(getAdminById.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(createAdmin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(createAdmin.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(updateAdmin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteAdmin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          type: action.type,
        };
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          type: action.type,
        };
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
          type: action.type,
        };
      })
  },
});

export const { actions: adminActions, reducer: adminReducer } = adminSlice;
export default adminSlice;
