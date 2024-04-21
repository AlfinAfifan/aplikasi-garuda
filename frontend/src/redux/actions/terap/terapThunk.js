import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getTerap = createAsyncThunk("getTerap", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/terap`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getTerapId = createAsyncThunk("getTerapId", async (id) => {
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_DOMAIN}/terap/${id}`,
    {
      withCredentials: true,
    },
  );

  return resp.data;
});

export const createTerap = createAsyncThunk("createTerap", async (data) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/terap/${data.id}`,
      data.data,
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

export const deleteTerap = createAsyncThunk("deleteTerap", async (id) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/deleteterap/${id}`, id,
      {
        withCredentials: true,
      },
    );

    toast.success("Hapus Data Sukses");
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
