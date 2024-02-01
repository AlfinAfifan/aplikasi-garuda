import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTerap = createAsyncThunk("getTerap", async () => {
  const resp = await axios.get("http://localhost:4000/terap", {
    withCredentials: true,
  });

  return resp.data;
});

export const createTerap = createAsyncThunk("createTerap", async (data) => {
  const resp = await axios.patch(
    `http://localhost:4000/terap/${data.id}`,
    data.data,
    {
      withCredentials: true,
    },
  );

  return resp.data;
});
