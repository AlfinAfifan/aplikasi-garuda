import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdmin = createAsyncThunk("getAdmin", async () => {
  const resp = await axios.get("http://localhost:4000/admin", {
    withCredentials: true,
  });

  return resp.data;
});

export const createAdmin = createAsyncThunk("createAdmin", async (data) => {
  const resp = await axios.post("http://localhost:4000/admin", data, {
    withCredentials: true,
  });

  return resp.data;
});
