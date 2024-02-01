import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { createTerap, getTerap } from "../../../redux/actions/terap/terapThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import InputDisabled from "../Form/InputDisabled";
import { getRakit } from "../../../redux/actions/rakit/rakitThunk";

const TableTerap = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Menghilangkan scroll pada body
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
    setLembagaSelected("");
    setSearchResult(null);
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataTerap = useSelector((i) => i.terap.data);
  const typeAction = useSelector((i) => i.terap.type);

  useEffect(() => {
    dispatch(getTerap());
    dispatch(getRakit());
  }, []);

  useEffect(() => {
    if (typeAction === "createTerap/fulfilled") {
      dispatch(getTerap());
    }
  }, [typeAction]);

  // GET ANGGOTA FOR CHOICE
  const dataAnggota = useSelector((i) => i.rakit.data);
  const [searchResult, setSearchResult] = useState(null);
  const [errorSearch, setErrorSearch] = useState(false);
  const [selected, setSelected] = useState("");
  const [lembagaSelected, setLembagaSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    id: data.id,
    key: data.id,
    value: data.anggota.nama,
    lembaga: data.anggota.lembaga.nama_lembaga,
  }));

  const onSearch = (record) => {
    setSearchResult(record.item.id);
    setLembagaSelected(record.item.lembaga);
    setSelected(record.item.value);
  };

  // HANDLE FORM & VALIDASI
  const onSubmit = (e) => {
    e.preventDefault();
    if (searchResult) {
      dispatch(createTerap({ id: searchResult }));
      closeModal();
    } else {
      setErrorSearch(true);
    }
  };

  return (
    <>
      <ShowDataLayout title="Tabel Data Terap" clickAdd={openModal}>
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
          {Array.isArray(dataTerap) ? (
            dataTerap.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{dateFormat(data.tgl_terap)}</td>
                <td className="flex gap-2">
                  <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                  <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
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
        title="Tambah Data Terap"
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

export default TableTerap;
