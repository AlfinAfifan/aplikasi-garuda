import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getRamu = createAsyncThunk("getRamu", async () => {
  const resp = await axios.get("http://localhost:4000/ramu", {
    withCredentials: true,
  });

  return resp.data;
});

export const createRamu = createAsyncThunk("createRamu", async (data) => {
  try {
    const resp = await axios.post("http://localhost:4000/tku", data, {
      withCredentials: true,
    });

    toast.success("Tambah Data Sukses");
    return resp.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
