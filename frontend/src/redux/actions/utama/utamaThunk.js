import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getUtama = createAsyncThunk("getUtama", async () => {
  const resp = await axios.get("http://localhost:4000/utama", {
    withCredentials: true,
  });

  return resp.data;
});

export const createUtama = createAsyncThunk("createUtama", async (data) => {
  try {
    const resp = await axios.patch(
      `http://localhost:4000/utama/${data.id}`,
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
