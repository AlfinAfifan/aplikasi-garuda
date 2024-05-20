import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Elements/Loader/Loader";
import Search from "../Elements/Search/Search";

const ShowDataLayout = ({
  children,
  title,
  clickAdd,
  descript,
  yearList,
  selectedYear,
  setSelectedYear,
  dataLenght,
  isLoading,
  handleSearch,
  searchPlacehold,
  setDataSearch
}) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isLembaga = location.pathname === "/lembaga";
  const isAdmin = location.pathname === "/admin";
  const isAnggota = location.pathname === "/anggota";
  const isJenis = location.pathname === "/jenis";

  if (!isLoading)
    return (
      <div className="m-5 rounded-lg border bg-white p-5 shadow-md">
        {/* TITLE */}
        <div className="flex justify-between">
          <h1 className="flex items-center gap-2 font-montserrat text-xl font-bold text-second">
            {title} <span className="text-xs font-normal">{descript}</span>
            {yearList?.length > 0 && (
              <select
                name=""
                id=""
                className={`rounded-md border border-black p-1 ${isDashboard || isLembaga || isAdmin || isAnggota || isJenis ? "hidden" : ""}`}
                onChange={(e) => setSelectedYear(e.target.value)}
                value={selectedYear}
              >
                {yearList?.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </h1>
          <Search handleSearch={handleSearch} searchPlacehold={searchPlacehold} setDataSearch={setDataSearch}/>
        </div>
        <div className="mt-2 h-0.5 w-full rounded-full bg-second opacity-75"></div>

        {dataLenght > 0 && (
          <>
            <div className="mt-6 flex justify-between">
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
          </>
        )}

        {dataLenght === 0 && (
          <div className="flex h-96 flex-col items-center justify-center gap-4">
            <h1 className="font-medium">Data Belum Ditambahkan</h1>
            <div className="flex justify-between">
              <button
                type="submit"
                className="h-9 rounded-md bg-second px-3 font-semibold text-white hover:bg-third"
                onClick={clickAdd}
              >
                Tambah Data
              </button>
            </div>
          </div>
        )}
      </div>
    );

  if (isLoading) return <Loader />;
};

export default ShowDataLayout;
