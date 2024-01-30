import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { getRamu } from "../../../redux/actions/ramu/ramuThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";

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

  // GET DATA
  const dispatch = useDispatch();
  const dataRamu = useSelector((i) => i.ramu.data);

  useEffect(() => {
    dispatch(getRamu());
  }, []);

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
          {dataRamu?.map((data, idx) => (
            <tr className="capitalize" key={idx}>
              <td className="font-bold">{formatSK(idx)}</td>
              <td>{data.anggota.nama}</td>
              <td>{data.anggota.lembaga.nama_lembaga}</td>
              <td>{dateFormat(data.tgl_ramu)}</td>
              <td className="flex gap-2">
                <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
              </td>
            </tr>
          ))}
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
