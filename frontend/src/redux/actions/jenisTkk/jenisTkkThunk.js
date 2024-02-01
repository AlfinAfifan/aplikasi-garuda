import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJenisTkk = createAsyncThunk("getJenisTkk", async () => {
  const resp = await axios.get("http://localhost:4000/jenistkk", {
    withCredentials: true,
  });

  return resp.data;
});

export const createJenisTkk = createAsyncThunk(
  "createJenisTkk",
  async (data) => {
    const resp = await axios.post("http://localhost:4000/jenistkk", data, {
      withCredentials: true,
    });

    return resp.data;
  },
);
