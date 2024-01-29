import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { anggotaReducer } from "./actions/anggota/anggotaSlice";
import { authReducer } from "./auth/authSlice";
// import thunk from "redux-thunk";

const reducer = combineReducers({
  anggota: anggotaReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer,
  // middleware: thunk,
});

export default store;
