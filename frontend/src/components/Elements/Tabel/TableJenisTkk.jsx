import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { getJenisTkk } from "../../../redux/actions/jenisTkk/jenisTkkThunk";

const TableJenisTkk = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
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
  const dataJenis = useSelector((i) => i.jenis.data);

  useEffect(() => {
    dispatch(getJenisTkk());
  }, []);

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Admin"
        clickAdd={openModal}
        clickOption={handleOption}
      >
        <THead>
          <tr>
            <td>No</td>
            <td>Jenis TKK</td>
            <td>Bidang</td>
            <td>Warna</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {dataJenis?.map((data, idx) => (
            <tr className="capitalize" key={idx}>
              <td className="font-bold">{idx + 1}</td>
              <td>{data.nama}</td>
              <td>{data.bidang}</td>
              <td>{data.warna}</td>

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
        title="Tambah Data Admin"
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
            label="Nama"
            name="nama"
            type="text"
            onchange={(e) => console.log(e.target.value)}
          />
          <Input label="Email" name="email" type="email" />
          <Input label="Asal Lembaga" name="lembaga" type="text" />
          <Input label="NTA" name="nta" type="text" />
          <Input label="Tempat Lahir" name="tmptLahir" type="text" />
          <Input label="Tanggal Lahir" name="tglLahir" type="date" />
          <Input label="Alamat" name="alamat" type="text" />
          <SelectOpt label="Agama" name="agama">
            <option value="pilih" disabled hidden>
              Pilih agama
            </option>
            <option value="">Islam</option>
            <option value="">Katholik</option>
          </SelectOpt>
          <SelectOpt label="Jabatan" name="jabatan">
            <option value="pilih" disabled hidden>
              Pilih jabatan
            </option>
            <option value="">Guru</option>
            <option value="">Pembina</option>
          </SelectOpt>

          <Button>Simpan</Button>
        </form>
      </Modal>
    </>
  );
};

export default TableJenisTkk;
