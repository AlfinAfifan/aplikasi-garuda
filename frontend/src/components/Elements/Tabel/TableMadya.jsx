import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getMadya } from "../../../redux/actions/madya/madyaThunk";
import { formatSK } from "../DataFormat/FormatSK";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const TableMadya = () => {
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
  const dataMadya = useSelector((i) => i.madya.data);

  useEffect(() => {
    dispatch(getMadya());
  }, []);

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Madya"
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
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {dataMadya?.map((data, idx) => (
            <tr className="capitalize" key={idx}>
              <td className="font-bold">{formatSK(idx)}</td>
              <td>{data.anggota.nama}</td>
              <td>{data.anggota.lembaga.nama_lembaga}</td>
              <td>{data.jenis_tkk.nama}</td>
              <td>{dateFormat(data.tgl_madya)}</td>
              <td className="flex gap-2">
                <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
                <DocumentTextIcon className="w-6 cursor-pointer text-amber-500 hover:text-amber-600" />
              </td>
            </tr>
          ))}
        </TBody>
      </ShowDataLayout>

      {/* MODAL INPUT */}
      <Modal
        title="Tambah Data Madya"
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
          <Input label="Asal Lembaga" name="Lembaga" type="text" />
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

export default TableMadya;
