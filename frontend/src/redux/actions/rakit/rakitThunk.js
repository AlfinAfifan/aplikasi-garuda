import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getRakit = createAsyncThunk("getRakit", async (year) => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/rakit/${year}`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getOptionRakit = createAsyncThunk("getOptionRakit", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/rakit`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getYearRakit = createAsyncThunk("getYearRakit", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/yearrakit`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createRakit = createAsyncThunk("createRakit", async (data) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/rakit/${data.id}`,
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

export const deleteRakit = createAsyncThunk("deleteRakit", async (id) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/deleterakit/${id}`,
      id,
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
