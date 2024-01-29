import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnggota = createAsyncThunk("getAnggota", async () => {
  const resp = await axios.get("http://localhost:4000/anggota", {
    withCredentials: true,
  });

  return resp.data;
});
