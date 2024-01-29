import React, { useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";

const TableUtama = () => {
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
        title="Tabel Data Utama"
        clickAdd={openModal}
        clickOption={handleOption}
      >
        <THead>
          <tr>
            <td>No SK</td>
            <td>Nama</td>
            <td>Asal Lembaga</td>
            <td>Jenis TKK</td>
            <td>Tanggal Dilantik</td>
            <td>Nama Penguji</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          <tr className="capitalize">
            <td className="font-bold">1</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td className="flex gap-2">
              <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
              <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
              <DocumentTextIcon className="w-6 cursor-pointer text-amber-500 hover:text-amber-600" />
            </td>
          </tr>
        </TBody>
      </ShowDataLayout>

      {/* MODAL INPUT */}
      <Modal
        title="Tambah Data Utama"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <form
          action="#"
          ref={formRef}
          className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
        >
          <Input
            label="Nama Lembaga"
            name="nama"
            type="text"
            onchange={(e) => console.log(e.target.value)}
          />
          <Input label="Alamat Lembaga" name="alamat" type="text" />
          <Input label="Nomor Gudep Putra" name="gudepL" type="text" />
          <Input label="Nomor Gudep Putri" name="gudepP" type="text" />
          <Input label="Kepala Sekolah" name="kepsek" type="text" />
          <Input label="NIP Kepala Sekolah" name="nipKepsek" type="text" />

          <Button>Simpan</Button>
        </form>
      </Modal>
    </>
  );
};

export default TableUtama;
