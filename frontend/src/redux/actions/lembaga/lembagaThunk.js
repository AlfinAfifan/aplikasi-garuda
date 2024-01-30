import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLembaga = createAsyncThunk("getLembaga", async () => {
  const resp = await axios.get("http://localhost:4000/lembaga", {
    withCredentials: true,
  });

  return resp.data;
});
