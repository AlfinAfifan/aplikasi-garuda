import React from "react";
import Sidebar from "../Elements/Sidebar/Sidebar";
import Navbar from "../Elements/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-slate-200">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="m-5 rounded-lg border bg-white p-5 shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
