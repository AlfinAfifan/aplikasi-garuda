import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUtama = createAsyncThunk("getUtama", async () => {
  const resp = await axios.get("http://localhost:4000/utama", {
    withCredentials: true,
  });

  return resp.data;
});
