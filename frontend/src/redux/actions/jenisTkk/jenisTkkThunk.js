import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getJenisTkk = createAsyncThunk("getJenisTkk", async () => {
  const resp = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/jenistkk`, {
    withCredentials: true,
  });

  return resp.data;
});

export const createJenisTkk = createAsyncThunk(
  "createJenisTkk",
  async (data) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_APP_DOMAIN}/jenistkk`,
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
  },
);
