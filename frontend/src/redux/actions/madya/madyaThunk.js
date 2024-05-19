import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getMadya = createAsyncThunk("getMadya", async (year) => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/madya/${year}`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getOptionMadya = createAsyncThunk("getOptionMadya", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/madya`, {
    withCredentials: true,
  });

  return resp.data;
});

export const getYearMadya = createAsyncThunk("getYearMadya", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/yearmadya`, {
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

export const deleteMadya = createAsyncThunk("deleteMadya", async (id) => {
  try {
    const resp = await axios.patch(
      `${import.meta.env.VITE_APP_DOMAIN}/deletemadya/${id}`,
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
