import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPurwa = createAsyncThunk("getPurwa", async () => {
  const resp = await axios.get("http://localhost:4000/purwa", {
    withCredentials: true,
  });

  return resp.data;
});

export const createPurwa = createAsyncThunk("createPurwa", async (data) => {
  const resp = await axios.post("http://localhost:4000/purwa", data, {
    withCredentials: true,
  });

  return resp.data;
});
