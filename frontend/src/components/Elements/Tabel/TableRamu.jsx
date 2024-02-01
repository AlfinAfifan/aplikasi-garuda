import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { createRamu, getRamu } from "../../../redux/actions/ramu/ramuThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getAnggota } from "../../../redux/actions/anggota/anggotaThunk";
import SelectSearch from "../Form/SelectSearch";
import InputDisabled from "../Form/InputDisabled";

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
    setLembagaSelected("");
    setSelected("");
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  const handleOption = () => {
    console.log("Option");
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataRamu = useSelector((i) => i.ramu.data);
  const typeAction = useSelector((i) => i.ramu.type);

  useEffect(() => {
    dispatch(getRamu());
    dispatch(getAnggota());
  }, []);

  useEffect(() => {
    if (typeAction === "createRamu/fulfilled") {
      dispatch(getRamu());
    }
  }, [typeAction]);

  // GET ANGGOTA FOR CHOICE
  const dataAnggota = useSelector((i) => i.anggota.data);
  const [searchResult, setSearchResult] = useState(null);
  const [errorSearch, setErrorSearch] = useState(false);
  const [selected, setSelected] = useState("");
  const [lembagaSelected, setLembagaSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    id: data.id,
    key: data.nama,
    value: data.nama,
    lembaga: data.lembaga.nama_lembaga,
  }));

  const onSearch = (record) => {
    setSearchResult(record.item.id);
    setLembagaSelected(record.item.lembaga);
    setSelected(record.item.key);
  };

  // HANDLE FORM & VALIDASI
  const onSubmit = (e) => {
    e.preventDefault();
    if (searchResult) {
      dispatch(createRamu({ id_anggota: searchResult }));
      closeModal();
    } else {
      setErrorSearch(true);
    }
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
          {Array.isArray(dataRamu) ? (
            dataRamu.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{dateFormat(data.tgl_ramu)}</td>
                <td className="flex gap-2">
                  <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Terjadi Error</td>
            </tr>
          )}
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
          onSubmit={onSubmit}
        >
          <SelectSearch
            name="id_anggota"
            label="Nama"
            placeholder={selected ? selected : "Cari Nama Anggota"}
            data={optionAnggota}
            onselect={onSearch}
            error={errorSearch}
          />
          <InputDisabled label="Asal Lembaga" value={lembagaSelected} />

          <Button>Simpan</Button>
        </form>
      </Modal>
    </>
  );
};

export default TableRamu;
