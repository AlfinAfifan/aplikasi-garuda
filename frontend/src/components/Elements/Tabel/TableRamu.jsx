import React, { useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";

const TableRamu = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Menghilangkan scroll pada body
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  const handleOption = () => {
    console.log("Option");
  };

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Ramu"
        clickAdd={openModal}
        clickOption={handleOption}
      >
        <THead>
          <tr>
            <td>No SK</td>
            <td>Nama</td>
            <td>Asal Lembaga</td>
            <td>Tanggal Dilantik</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          <tr className="capitalize">
            <td className="font-bold">1</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td className="flex gap-2">
              <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
              <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
            </td>
          </tr>
        </TBody>
      </ShowDataLayout>

      {/* MODAL INPUT */}
      <Modal
        title="Tambah Data Ramu"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <form
          action="#"
          ref={formRef}
          className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-40"
        >
          <SelectOpt label="Nama" name="nama">
            <option disabled hidden value="pilih">
              Pilih nama anggota
            </option>
            <option value="">Dwi Nur</option>
          </SelectOpt>
          <Input label="Asal Lembaga" name="Lembaga" type="text" />

          <Button>Simpan</Button>
        </form>
      </Modal>
    </>
  );
};

export default TableRamu;
