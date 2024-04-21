import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalDelete } from "../../../redux/actions/modal/modalSlice";

const ModalDelete = ({ handleDelete, title }) => {
  const isModalOpen = useSelector((state) => state.modal.modalDelete);
  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const dispatch = useDispatch();

  return (
    isModalOpen && (
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 flex justify-center items-center z-30 bg-black/40 backdrop-blur-[1px]`}
          onClick={() => dispatch(closeModalDelete())}
        >
          <div
            className={`fixed z-30 flex min-h-[200px] w-[420px] overflow-auto rounded-2xl bg-white p-8 shadow-md`}
          >
            <div className="flex w-full flex-col">
              <div className="flex w-full justify-between">
                <h1 className="font-montserrat text-lg font-semibold text-second">
                  Konfirmasi Hapus
                </h1>
                <div
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-second hover:text-white"
                  onClick={() => dispatch(closeModalDelete())}
                >
                  <XMarkIcon className="w-6" />
                </div>
              </div>
              <div className="w-ful mt-2 h-0.5 rounded-full bg-second opacity-75">
                <h1 className="opacity-0">kunci</h1>
              </div>

              <div className="mt-9 flex justify-center">{title}</div>
              <div className="mt-9 grid grid-cols-2 items-stretch justify-evenly gap-x-6">
                <button
                  type="submit"
                  className="h-9 rounded-md border-2 border-sky-900 font-semibold text-sky-900 hover:bg-sky-50"
                  onClick={() => dispatch(closeModalDelete())}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 rounded-md bg-red-700 font-semibold text-white hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  );
};

export default ModalDelete;
