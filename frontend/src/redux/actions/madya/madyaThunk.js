import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMadya = createAsyncThunk("getMadya", async () => {
  const resp = await axios.get("http://localhost:4000/madya", {
    withCredentials: true,
  });

  return resp.data;
});

export const createMadya = createAsyncThunk("createMadya", async (data) => {
  const resp = await axios.patch(
    `http://localhost:4000/madya/${data.id}`,
    data,
    {
      withCredentials: true,
    },
  );

  return resp.data;
});
