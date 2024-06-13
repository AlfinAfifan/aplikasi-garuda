import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/logout`, {
      withCredentials: true,
    });

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id_lembaga");
    sessionStorage.removeItem("login_time");
    const accessToken = sessionStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/", { replace: true });
    }
  };

  const name = sessionStorage.getItem("name")
  return (
    <div className="sticky top-0 z-20 flex h-14 items-center justify-end bg-white px-5 shadow-md font-montserrat">
      {/* <div className="flex w-[35%] items-center">
        <input
          type="text"
          className="h-8 w-full rounded-l-md border border-gray-500 p-2"
        />
        <button
          type="submit"
          className="h-8 rounded-r-md bg-second px-2 font-semibold text-white hover:bg-third"
        >
          <MagnifyingGlassIcon className="w-5" />
        </button>
      </div> */}
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={handleLogout}
      >
        <h1 className="capitalize font-semibold">{name}</h1>
        <UserCircleIcon className="w-9" />
      </div>
    </div>
  );
};

export default Navbar;
