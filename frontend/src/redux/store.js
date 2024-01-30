import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { anggotaReducer } from "./actions/anggota/anggotaSlice";
import { authReducer } from "./auth/authSlice";
import { lembagaReducer } from "./actions/lembaga/lembagaSlice";
import { adminReducer } from "./actions/admin/adminSlice";
import { ramuReducer } from "./actions/ramu/ramuSlice";
import { rakitReducer } from "./actions/rakit/rakitSlice";
import { terapReducer } from "./actions/terap/terapSlice";
import { purwaReducer } from "./actions/purwa/purwaSlice";
import { madyaReducer } from "./actions/madya/madyaSlice";
import { utamaReducer } from "./actions/utama/utamaSlice";
// import thunk from "redux-thunk";

const reducer = combineReducers({
  auth: authReducer,
  anggota: anggotaReducer,
  lembaga: lembagaReducer,
  admin: adminReducer,
  ramu: ramuReducer,
  rakit: rakitReducer,
  terap: terapReducer,
  purwa: purwaReducer,
  madya: madyaReducer,
  utama: utamaReducer,
});

const store = configureStore({
  reducer,
  // middleware: thunk,
});

export default store;
