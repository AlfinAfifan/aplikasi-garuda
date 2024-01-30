import { createSlice } from "@reduxjs/toolkit";
import { getJenisTkk } from "./jenisTkkThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
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
        };
      })
      .addCase(getJenisTkk.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getJenisTkk.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: jenisTkkActions, reducer: jenisTkkReducer } = jenisTkkSlice;
export { jenisTkkActions, jenisTkkReducer };
export default jenisTkkSlice;
