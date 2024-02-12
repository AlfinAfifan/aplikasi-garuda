import { createSlice } from "@reduxjs/toolkit";
import { createJenisTkk, getJenisTkk } from "./jenisTkkThunk";

const initialState = {
  data: [],
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
      });
  },
});

const { actions: jenisTkkActions, reducer: jenisTkkReducer } = jenisTkkSlice;
export { jenisTkkActions, jenisTkkReducer };
export default jenisTkkSlice;
