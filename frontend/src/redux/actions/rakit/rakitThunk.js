import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRakit = createAsyncThunk("getRakit", async () => {
  const resp = await axios.get("http://localhost:4000/rakit", {
    withCredentials: true,
  });

  return resp.data;
});

export const createRakit = createAsyncThunk("createRakit", async (data) => {
  const resp = await axios.patch(
    `http://localhost:4000/rakit/${data.id}`,
    data.data,
    {
      withCredentials: true,
    },
  );

  return resp.data;
});
