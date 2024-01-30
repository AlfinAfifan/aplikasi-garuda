import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdmin = createAsyncThunk("getAdmin", async () => {
  const resp = await axios.get("http://localhost:4000/admin", {
    withCredentials: true,
  });

  return resp.data;
});
