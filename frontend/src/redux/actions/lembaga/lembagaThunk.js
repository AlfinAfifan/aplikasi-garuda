import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getLembaga = createAsyncThunk("getLembaga", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/lembaga`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getLembagaById = createAsyncThunk("getLembagaById", async (id) => {
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_DOMAIN}/lembaga/${id}`,
    {
      withCredentials: true,
    },
  );

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

export const updateLembaga = createAsyncThunk(
  "updateLembaga",
  async (dataUpdate) => {
    try {
      const resp = await axios.patch(
        `${import.meta.env.VITE_APP_DOMAIN}/lembaga/${dataUpdate.id}`,
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
  },
);

export const deleteLembaga = createAsyncThunk("deleteLembaga", async (id) => {
  try {
    const resp = await axios.delete(
      `${import.meta.env.VITE_APP_DOMAIN}/lembaga/${id}`,
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
