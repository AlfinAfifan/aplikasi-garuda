import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRamu = createAsyncThunk("getRamu", async () => {
  const resp = await axios.get("http://localhost:4000/ramu", {
    withCredentials: true,
  });

  return resp.data;
});
