import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { anggotaReducer } from "./actions/anggota/anggotaSlice";
import { lembagaReducer } from "./actions/lembaga/lembagaSlice";
import { adminReducer } from "./actions/admin/adminSlice";
import { ramuReducer } from "./actions/ramu/ramuSlice";
import { rakitReducer } from "./actions/rakit/rakitSlice";
import { terapReducer } from "./actions/terap/terapSlice";
import { purwaReducer } from "./actions/purwa/purwaSlice";
import { madyaReducer } from "./actions/madya/madyaSlice";
import { utamaReducer } from "./actions/utama/utamaSlice";
import { jenisTkkReducer } from "./actions/jenisTkk/jenisTkkSlice";
import { modalReducer } from "./actions/modal/modalSlice";
import { loginReducer } from "./actions/auth/loginSlice";
// import thunk from "redux-thunk";

const reducer = combineReducers({
  anggota: anggotaReducer,
  lembaga: lembagaReducer,
  admin: adminReducer,
  ramu: ramuReducer,
  rakit: rakitReducer,
  terap: terapReducer,
  purwa: purwaReducer,
  madya: madyaReducer,
  utama: utamaReducer,
  jenis: jenisTkkReducer,
  modal: modalReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
