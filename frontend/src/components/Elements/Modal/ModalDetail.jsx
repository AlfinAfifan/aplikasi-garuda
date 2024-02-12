import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const ModalDetail = ({ children, isModalOpen, title, onClick }) => {
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-30 ${isModalOpen ? "bg-black/40 backdrop-blur-[1px]" : "hidden"}`}
        onClick={onClick}
      ></div>
      <div
        className={`fixed left-80 right-80 z-30 flex  max-h-[90%] overflow-auto rounded-t-2xl bg-white p-8 shadow-md duration-1000 ${isModalOpen ? "bottom-0" : "-bottom-[100%]"}`}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <h1 className="font-montserrat text-xl font-semibold text-second">
              {title}
            </h1>
            <div
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-second hover:text-white"
              onClick={onClick}
            >
              <XMarkIcon className="w-6" />
            </div>
          </div>
          <div className="w-ful mt-2 h-0.5 rounded-full bg-second opacity-75">
            <h1 className="opacity-0">kunci</h1>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-4 pb-16">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDetail;
