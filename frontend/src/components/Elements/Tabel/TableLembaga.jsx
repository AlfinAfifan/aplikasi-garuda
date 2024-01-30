import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import { getLembaga } from "../../../redux/actions/lembaga/lembagaThunk";

const TableLembaga = () => {
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

  // GET DATA
  const dispatch = useDispatch();
  const dataLembaga = useSelector((i) => i.lembaga.data);

  useEffect(() => {
    dispatch(getLembaga());
  }, []);

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Lembaga"
        clickAdd={openModal}
        clickOption={handleOption}
      >
        <THead>
          <tr>
            <td className="w-5">No</td>
            <td>Nama Lembaga</td>
            <td>Alamat</td>
            <td>Gudep Putra</td>
            <td>Gudep Putri</td>
            <td>Kepsek</td>
            <td>NIP Kepsek</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {dataLembaga?.map((data, idx) => (
            <tr className="capitalize" key={idx}>
              <td className="font-bold">{idx + 1}</td>
              <td>{data.nama_lembaga}</td>
              <td>{data.alamat}</td>
              <td>{data.no_gudep_lk}</td>
              <td>{data.no_gudep_pr}</td>
              <td>{data.kepsek}</td>
              <td>{data.nip_kepsek}</td>
              <td className="flex gap-2">
                <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
              </td>
            </tr>
          ))}
        </TBody>
      </ShowDataLayout>

      {/* Modal Input */}
      <Modal
        title="Tambah Data Lembaga"
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

export default TableLembaga;
