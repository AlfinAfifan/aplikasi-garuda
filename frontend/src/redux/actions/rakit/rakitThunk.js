import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getRakit = createAsyncThunk("getRakit", async () => {
  const resp = await axios.get("http://localhost:4000/rakit", {
    withCredentials: true,
  });

  return resp.data;
});

export const createRakit = createAsyncThunk("createRakit", async (data) => {
  try {
    const resp = await axios.patch(
      `http://localhost:4000/rakit/${data.id}`,
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
