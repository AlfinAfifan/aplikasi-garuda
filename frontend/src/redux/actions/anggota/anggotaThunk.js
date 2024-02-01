import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAnggota = createAsyncThunk("getAnggota", async () => {
  const resp = await axios.get("http://localhost:4000/anggota", {
    withCredentials: true,
  });

  return resp.data;
});

export const createAnggota = createAsyncThunk("createAnggota", async (data) => {
  try {
    const resp = await axios.post("http://localhost:4000/anggota", data, {
      withCredentials: true,
    });

    toast.success("Tambah Data Sukses");
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
