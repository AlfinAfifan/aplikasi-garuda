import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getTerap = createAsyncThunk("getTerap", async () => {
  const resp = await axios.get("http://localhost:4000/terap", {
    withCredentials: true,
  });

  return resp.data;
});

export const createTerap = createAsyncThunk("createTerap", async (data) => {
  try {
    const resp = await axios.patch(
      `http://localhost:4000/terap/${data.id}`,
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
