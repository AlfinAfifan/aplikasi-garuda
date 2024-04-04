import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAnggota = createAsyncThunk("getAnggota", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/anggota`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getAnggotaById = createAsyncThunk("getAnggotaById", async (id) => {
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_DOMAIN}/anggota/${id}`,
    {
      withCredentials: true,
    },
  );

  return resp.data;
});

export const createAnggota = createAsyncThunk("createAnggota", async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_APP_DOMAIN}/anggota`,
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

export const updateAnggota = createAsyncThunk("updateAnggota", async (dataUpdate) => {
  console.log(dataUpdate);
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/anggota/${dataUpdate.id}`,
      dataUpdate.data,
      {
        withCredentials: true,
      },
    );

    toast.success("Edit Data Sukses");
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
