import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalDelete: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalDelete: (state) => {
      state.modalDelete = true;
    },
    closeModalDelete: (state) => {
      state.modalDelete = false;
    },
  },
});

export const { actions: modalActions, reducer: modalReducer } = modalSlice;
export const { openModalDelete, closeModalDelete } = modalActions; // Menggunakan modalActions
export default modalSlice;
