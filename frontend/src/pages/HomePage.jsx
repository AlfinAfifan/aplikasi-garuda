import React from "react";
import LineChart from "../components/Elements/Chart/LineChart";
import { FaRegEnvelope, FaUserTie } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="grid grid-cols-12 font-montserrat">
      <div className="col-span-8 m-5 flex flex-col items-center justify-center rounded-xl border bg-white p-5 shadow-md">
        <div className="mb-5 flex w-full items-center justify-between gap-5">
          <h1 className="font-normal">Diagram Data Kecakapan Umum & Khusus</h1>
          <div className="flex">
            <button className="rounded-lg bg-second px-5 py-1.5 text-white shadow-md">
              Diagram Garis
            </button>
            <button className="rounded-lg px-5 py-1.5 shadow-md">
              Diagram Batang
            </button>
          </div>
        </div>
        <LineChart />
      </div>
      <div className="col-span-4 m-5 flex flex-col gap-5">
        <div className="flex min-h-24 w-full items-center justify-between rounded-xl bg-second px-8 py-5 text-white shadow-md">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Agus Alfin Afifan</h1>
            <div className="mt-3 flex items-center gap-2 opacity-70">
              <FaRegEnvelope className="text-sm" />
              <h1 className="text-sm">agusalfin@gmail.com</h1>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <FaRegEnvelope className="text-sm" />
              <h1 className="text-sm">SMK Islam Durenan</h1>
            </div>
          </div>
          <FaUserTie className="text-5xl" />
        </div>
        <div className=" grid grid-cols-2 gap-5">
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-7 py-5 shadow-md">
            <h1 className="text-6xl font-bold text-third">34</h1>
            <h1 className="text-sm text-third">Data</h1>
            <h1 className="mt-2 text-xl font-bold">Admin</h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-7 py-5 shadow-md">
            <h1 className="text-6xl font-bold text-third">70</h1>
            <h1 className="text-sm text-third">Data</h1>
            <h1 className="mt-2 text-xl font-bold">Lembaga</h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-7 py-5 shadow-md">
            <h1 className="text-6xl font-bold text-third">183</h1>
            <h1 className="text-sm text-third">Data</h1>
            <h1 className="mt-2 text-xl font-bold">Anggota</h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-7 py-5 shadow-md">
            <h1 className="text-6xl font-bold text-third">12</h1>
            <h1 className="text-sm text-third">Data</h1>
            <h1 className="mt-2 text-xl font-bold">Jenis TKK</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
