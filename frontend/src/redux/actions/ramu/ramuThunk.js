import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getRamu = createAsyncThunk("getRamu", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/ramu`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createRamu = createAsyncThunk("createRamu", async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_APP_DOMAIN}/tku`,
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
