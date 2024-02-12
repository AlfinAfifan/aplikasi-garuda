import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getLembaga = createAsyncThunk("getLembaga", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/lembaga`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createLembaga = createAsyncThunk("createLembaga", async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_APP_DOMAIN}/lembaga`,
      data,
      {
        withCredentials: true,
      },
    );

    toast.success("Tambah Data Sukses");
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
