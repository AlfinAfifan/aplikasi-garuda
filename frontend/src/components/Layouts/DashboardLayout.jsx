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
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
