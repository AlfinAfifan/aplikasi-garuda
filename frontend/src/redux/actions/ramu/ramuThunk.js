import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRamu = createAsyncThunk("getRamu", async () => {
  const resp = await axios.get("http://localhost:4000/ramu", {
    withCredentials: true,
  });

  return resp.data;
});

export const createRamu = createAsyncThunk("createRamu", async (data) => {
  const resp = await axios.post("http://localhost:4000/tku", data, {
    withCredentials: true,
  });

  return resp.data;
});
