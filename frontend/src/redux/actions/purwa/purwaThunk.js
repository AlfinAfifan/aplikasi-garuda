import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getPurwa = createAsyncThunk("getPurwa", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/purwa`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getPurwaId = createAsyncThunk("getPurwaId", async (id) => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/tkk/${id}`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createPurwa = createAsyncThunk("createPurwa", async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_APP_DOMAIN}/purwa`,
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
