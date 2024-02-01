import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/images/not-found.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-[#fdfbff]">
      <div className="flex flex-col justify-center gap-24">
        <div className="flex flex-col items-center gap-4">
          <img src={notFound} alt="not-found-img" className="w-64" />
          <div className="flex h-[96px] w-[290px] flex-col gap-3 text-center">
            <h1 className="font-face-ro font text-4xl">Page 404 Not Found</h1>
            <p className="font-face-ro text-base">
              Halaman tidak ditemukan. Kamu bisa kembali ke halaman sebelumnya
            </p>
          </div>
        </div>
        <button
          className="h-[50px]  w-[360px] rounded-2xl bg-third text-white"
          onClick={() => navigate(-1)}
        >
          Get Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
