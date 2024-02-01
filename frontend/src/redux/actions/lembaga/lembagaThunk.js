import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLembaga = createAsyncThunk("getLembaga", async () => {
  const resp = await axios.get("http://localhost:4000/lembaga", {
    withCredentials: true,
  });

  return resp.data;
});

export const createLembaga = createAsyncThunk("createLembaga", async (data) => {
  const resp = await axios.post("http://localhost:4000/lembaga", data, {
    withCredentials: true,
  });

  return resp.data;
});
