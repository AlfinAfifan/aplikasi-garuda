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
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { getPurwa } from "../../../redux/actions/purwa/purwaThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import { getRakit } from "../../../redux/actions/rakit/rakitThunk";
import InputDisabled from "../Form/InputDisabled";

const TablePurwa = () => {
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
  const dataPurwa = useSelector((i) => i.purwa.data);

  useEffect(() => {
    dispatch(getPurwa());
    dispatch(getRakit());
  }, []);

  // GET ANGGOTA FOR CHOICE
  const dataAnggota = useSelector((i) => i.rakit.data);
  const [searchResult, setSearchResult] = useState(null);
  const [errorSearch, setErrorSearch] = useState(false);
  const [selected, setSelected] = useState(false);

  const [lembagaSelected, setLembagaSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    id: data.id,
    key: data.anggota.nama,
    value: data.anggota.nama,
  }));
  const onSearch = (record) => {
    setSearchResult(record.item.id);
    setSelected(record.item.key);
    setLembagaSelected(record.item.lembaga);
  };

  // HANDLE FORM & VALIDASI
  const initialValues = {
    nama_penguji: "",
    jabatan_penguji: "",
    alamat_penguji: "",
  };

  const validationSchema = Yup.object().shape({
    nama_penguji: Yup.string().required("Nama harus diisi"),
    jabatan_penguji: Yup.string().required("Jabatan harus diisi"),
    alamat_penguji: Yup.string().required("Alamat harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    const dataCreate = {
      ...values,
      id_lembaga: searchResult,
    };

    if (searchResult) {
      dispatch(createAdmin(dataCreate));
      closeModal();
    } else {
      setErrorSearch(true);
    }
  };

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Purwa"
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
          {dataPurwa?.map((data, idx) => (
            <tr className="capitalize" key={idx}>
              <td className="font-bold">{formatSK(idx)}</td>
              <td>{data.anggota.nama}</td>
              <td>{data.anggota.lembaga.nama_lembaga}</td>
              <td>{data.jenis_tkk.nama}</td>
              <td>{dateFormat(data.tgl_purwa)}</td>
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
        title="Tambah Data Purwa"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(form) => (
            <Form
              action="#"
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
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
              <SelectSearch
                name="id_jenis_tkk"
                label="Jenis TKK"
                placeholder={selected ? selected : "Cari Jenis TKK"}
                data={optionAnggota}
                onselect={onSearch}
                error={errorSearch}
              />
              <Input label="Bidang" name="bidang" type="text" />
              <Input label="Nama Penguji" name="penguji" type="text" />
              <Input label="Jabatan Penguji" name="jabatan" type="text" />
              <Input label="Alamat Penguji" name="alamat" type="text" />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TablePurwa;
