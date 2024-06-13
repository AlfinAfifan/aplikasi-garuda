import React, { useEffect, useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  IdentificationIcon,
  PlayIcon,
  PresentationChartBarIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useLocation } from "react-router-dom";
import Garuda from "../../../assets/images/garuda.png";
import "./index.css";

const Sidebar = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isLembaga = location.pathname === "/lembaga";
  const isAdmin = location.pathname === "/admin";
  const isAnggota = location.pathname === "/anggota";
  const isRamu = location.pathname === "/ramu";
  const isRakit = location.pathname === "/rakit";
  const isTerap = location.pathname === "/terap";
  const isPurwa = location.pathname === "/purwa";
  const isMadya = location.pathname === "/madya";
  const isUtama = location.pathname === "/utama";
  const isJenis = location.pathname === "/jenis";
  const isRekap = location.pathname === "/rekap";

  // DROPDOWN
  const [isTku, setIsTku] = useState(false);
  const [isTkk, setIsTkk] = useState(false);

  // SMALL SIDEBAR
  const [isOpen, setIsOpen] = useState(true);

  const idLembaga = sessionStorage.getItem("id_lembaga");

  return (
    <div
      className={`sticky top-0 flex h-screen flex-col bg-first font-montserrat text-sm text-white duration-500 ${isOpen ? "w-64" : "w-24"} ${idLembaga === "null" ? "gap-2.5" : "gap-3.5"}`}
    >
      <img
        src={Garuda}
        alt=""
        className={`mx-auto ${isOpen ? "my-4 h-24 w-24" : "my-8 h-14 w-14"}`}
      />
      <div className="h-0.5 w-full bg-white opacity-20"></div>

      <NavLink to="/dashboard" className={`flex items-center`}>
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isDashboard ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4  hover:opacity-100 ${isDashboard ? "opacity-100" : "opacity-40"}`}
        >
          <HomeIcon className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`} />
          <h1 className={`${isOpen ? "" : "hidden"}`}>Dashboard</h1>
        </div>
      </NavLink>
      {idLembaga === 'null' && (
        <NavLink to="/admin" className="flex items-center">
          <div
            className={`h-11 w-1.5 bg-orange-600 ${isAdmin ? "opacity-100" : "opacity-0"}`}
          ></div>
          <div
            className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isAdmin ? "opacity-100" : "opacity-40"}`}
          >
            <IdentificationIcon
              className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`}
            />
            <h1 className={`${isOpen ? "" : "hidden"}`}>Admin</h1>
          </div>
        </NavLink>
      )}
      <NavLink to="/lembaga" className="flex items-center">
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isLembaga ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isLembaga ? "opacity-100" : "opacity-40"}`}
        >
          <ClipboardDocumentListIcon
            className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`}
          />
          <h1 className={`${isOpen ? "" : "hidden"}`}>Lembaga</h1>
        </div>
      </NavLink>
      <NavLink to="/anggota" className="flex items-center">
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isAnggota ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isAnggota ? "opacity-100" : "opacity-40"}`}
        >
          <UsersIcon className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`} />
          <h1 className={`${isOpen ? "" : "hidden"}`}>Anggota</h1>
        </div>
      </NavLink>

      {/* TKU */}
      <NavLink
        to="#"
        className="flex items-center"
        onClick={() => {
          setIsTku(!isTku), setIsTkk(false);
        }}
      >
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isRamu || isRakit || isTerap ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isRamu || isRakit || isTerap ? "opacity-100" : "opacity-40"}`}
        >
          <PresentationChartBarIcon
            className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`}
          />
          <h1 className={`text-nowrap ${isOpen ? "" : "hidden"}`}>
            Kecakapan Umum
          </h1>
          <PlayIcon
            className={`-ml-2 h-3 duration-500 ${isTku ? "rotate-0" : "rotate-90"} ${isOpen ? "" : "hidden"}`}
          />
        </div>
      </NavLink>
      <div
        className={`submenu ml-6 flex flex-col gap-2.5 ${isOpen ? "-mt-3.5" : "-mt-2.5"} ${isTku ? "submenu-open" : ""}`}
      >
        <NavLink to="/ramu" className={`items-center1 flex`}>
          <div
            className={` flex items-center gap-5 hover:opacity-100 ${isRamu ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Ramu</h1>
          </div>
        </NavLink>
        <NavLink to="/rakit" className={`items-center1 flex `}>
          <div
            className={` flex items-center gap-5 hover:opacity-100 ${isRakit ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Rakit</h1>
          </div>
        </NavLink>
        <NavLink to="/terap" className={`items-center1 flex `}>
          <div
            className={` flex items-center gap-5 hover:opacity-100 ${isTerap ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Terap</h1>
          </div>
        </NavLink>
      </div>

      {/* TKK */}
      <NavLink
        to="#"
        className="flex items-center"
        onClick={() => {
          setIsTkk(!isTkk), setIsTku(false);
        }}
      >
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isPurwa || isMadya || isUtama ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isPurwa || isMadya || isUtama ? "opacity-100" : "opacity-40"}`}
        >
          <PresentationChartLineIcon
            className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`}
          />
          <h1 className={`text-nowrap ${isOpen ? "" : "hidden"}`}>
            Kecakapan Khusus
          </h1>
          <PlayIcon
            className={`-ml-2 h-3 duration-200 ${isTkk ? "rotate-0" : "rotate-90"} ${isOpen ? "" : "hidden"}`}
          />
        </div>
      </NavLink>
      <div
        className={`submenu ml-6 flex flex-col gap-2.5  ${isOpen ? "-mt-3.5" : "-mt-2.5"} ${isTkk ? "submenu-open" : ""}`}
      >
        <NavLink to="/purwa" className={`items-center1 flex`}>
          <div
            className={`flex items-center gap-5 hover:opacity-100 ${isPurwa ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Purwa</h1>
          </div>
        </NavLink>
        <NavLink to="/madya" className={`items-center1 flex`}>
          <div
            className={`flex items-center gap-5 hover:opacity-100 ${isMadya ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Madya</h1>
          </div>
        </NavLink>
        <NavLink to="/utama" className={`items-center1 flex`}>
          <div
            className={`flex items-center gap-5 hover:opacity-100 ${isUtama ? "opacity-100" : "opacity-40"}`}
          >
            <PresentationChartBarIcon
              className={`h-5 opacity-0 ${isOpen ? "" : "hidden"}`}
            />
            <h1 className={`${isOpen ? "" : "ml-1"}`}>Utama</h1>
          </div>
        </NavLink>
      </div>

      <NavLink to="/jenis" className="flex items-center">
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isJenis ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isJenis ? "opacity-100" : "opacity-40"}`}
        >
          <QueueListIcon className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`} />
          <h1 className={`${isOpen ? "" : "hidden"}`}>Jenis TKK</h1>
        </div>
      </NavLink>

      <NavLink to="/rekap" className="flex items-center">
        <div
          className={`h-11 w-1.5 bg-orange-600 ${isRekap ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`ml-5 flex items-center gap-4 hover:opacity-100 ${isRekap ? "opacity-100" : "opacity-40"}`}
        >
          <TableCellsIcon className={`${isOpen ? "h-5" : "ml-1.5 h-6"}`} />
          <h1 className={`${isOpen ? "" : "hidden"}`}>Rekap</h1>
        </div>
      </NavLink>

      {/* TOGGLE SIDEBAR */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 left-[50%] mx-auto -translate-x-[50%] rounded-full bg-slate-400 p-2 hover:bg-white"
      >
        <ChevronDoubleLeftIcon
          className={`text-[#06163a] duration-500 ${isOpen ? "h-5 rotate-0" : "h-4 rotate-180"}`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
