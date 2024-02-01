import React from "react";
import { useLocation } from "react-router-dom";

const ShowDataLayout = ({ children, title, clickAdd, descript }) => {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isLembaga = location.pathname === "/lembaga";
  const isAdmin = location.pathname === "/admin";
  const isAnggota = location.pathname === "/anggota";
  const isJenis = location.pathname === "/jenis";

  return (
    <div className="">
      {/* TITLE */}
      <h1 className="flex items-center gap-2 font-montserrat text-xl font-bold text-second">
        {title} <span className="text-xs font-normal">{descript}</span>
        <select
          name=""
          id=""
          className={`rounded-md border border-black p-1 ${isDashboard || isLembaga || isAdmin || isAnggota || isJenis ? "hidden" : ""}`}
        >
          <option value="">2020</option>
        </select>
      </h1>
      <div className="mt-2 h-0.5 w-full rounded-full bg-second opacity-75"></div>
      <div className="mt-8 flex justify-between">
        <button
          type="submit"
          className="h-9 rounded-md bg-second px-3 font-semibold text-white hover:bg-third"
          onClick={clickAdd}
        >
          Tambah
        </button>
      </div>

      {/* TABEL */}
      <div className="mt-5 overflow-x-auto rounded-t-xl ">
        <table className="table table-zebra text-sm">{children}</table>
      </div>
    </div>
  );
};

export default ShowDataLayout;
