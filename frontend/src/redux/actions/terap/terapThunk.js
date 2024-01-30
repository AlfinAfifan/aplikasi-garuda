import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTerap = createAsyncThunk("getTerap", async () => {
  const resp = await axios.get("http://localhost:4000/terap", {
    withCredentials: true,
  });

  return resp.data;
});
