import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAdmin = createAsyncThunk("getAdmin", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/admin`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createAdmin = createAsyncThunk("createAdmin", async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_APP_DOMAIN}/admin`,
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
