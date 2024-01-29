import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const refreshToken = createAsyncThunk("refreshToken", async () => {
  try {
    const resp = await axios.get("http://localhost:4000/token", {
      withCredentials: true,
    });

    return resp.data;
  } catch (error) {
    throw error;
  }
});
