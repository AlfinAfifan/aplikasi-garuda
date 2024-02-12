import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getMadya = createAsyncThunk("getMadya", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/madya`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getMadyaId = createAsyncThunk("getMadyaId", async (id) => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/tkk/${id}`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createMadya = createAsyncThunk("createMadya", async (data) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/madya/${data.id}`,
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
