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
import {
  createPurwa,
  getPurwa,
  getPurwaId,
} from "../../../redux/actions/purwa/purwaThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import { getRakit } from "../../../redux/actions/rakit/rakitThunk";
import InputDisabled from "../Form/InputDisabled";
import { getJenisTkk } from "../../../redux/actions/jenisTkk/jenisTkkThunk";
import ModalDetail from "../Modal/ModalDetail";
import ListDetail from "../Modal/ListDetail";

const TablePurwa = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalDetailOpen, setModalDetailOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Menghilangkan scroll pada body
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    setModalDetailOpen(false);
    setLembagaSelected("");
    setSelected("");
    setSelected2("");
    setSearchResult(null);
    setSearchResult2(null);
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataPurwa = useSelector((i) => i.purwa.data);
  const dataPurwaId = useSelector((i) => i.purwa.dataById);
  const typeAction = useSelector((i) => i.purwa.type);

  useEffect(() => {
    dispatch(getPurwa());
    dispatch(getRakit());
    dispatch(getJenisTkk());
  }, []);

  useEffect(() => {
    if (typeAction === "createPurwa/fulfilled") {
      dispatch(getPurwa());
    } else if (typeAction === "getPurwaId/fulfilled") {
      dispatch(getPurwa());
    }
  }, [typeAction]);

  // GET ANGGOTA & JENIS TKK FOR CHOICE
  const dataAnggota = useSelector((i) => i.rakit.data);
  const dataJenis = useSelector((i) => i.jenis.data);

  // HANDLE SELECT SEARCH LEMBAGA
  const [searchResult, setSearchResult] = useState(null);
  const [errorSearch, setErrorSearch] = useState(false);
  const [selected, setSelected] = useState(false);

  const [lembagaSelected, setLembagaSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    id: data.id_anggota,
    key: data.id,
    value: data.anggota.nama,
    lembaga: data.anggota.lembaga.nama_lembaga,
  }));
  const optionJenis = dataJenis.map((data) => ({
    id: data.id,
    key: data.id,
    value: data.nama,
  }));

  const onSearch = (record) => {
    setSearchResult(record.item.id);
    setSelected(record.item.value);
    setLembagaSelected(record.item.lembaga);
  };

  // HANDLE SELECT SEARCH JENIS TKK
  const [searchResult2, setSearchResult2] = useState(null);
  const [errorSearch2, setErrorSearch2] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const onSearch2 = (record) => {
    setSearchResult2(record.item.id);
    setSelected2(record.item.key);
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
      id_anggota: searchResult,
      id_jenis_tkk: searchResult2,
    };

    if (searchResult && searchResult2) {
      dispatch(createPurwa(dataCreate));
      closeModal();
    } else {
      setErrorSearch(!searchResult);
      setErrorSearch2(!searchResult2);
    }
  };

  // HANDLE DETAIL
  const [sk, setSk] = useState("");
  const handleDetail = async (id, sk) => {
    setSk(sk);
    setModalDetailOpen(true);
    dispatch(getPurwaId(id));
  };

  return (
    <>
      <ShowDataLayout title="Tabel Data Purwa" clickAdd={openModal}>
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
          {Array.isArray(dataPurwa) ? (
            dataPurwa.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{data.jenis_tkk.nama}</td>
                <td>{dateFormat(data.tgl_purwa)}</td>
                <td className="flex gap-2">
                  <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                  <DocumentTextIcon
                    className="w-6 cursor-pointer text-amber-500 hover:text-amber-600"
                    onClick={() => handleDetail(data.id, formatSK(idx))}
                  />
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
                placeholder={selected2 ? selected2 : "Cari Jenis TKK"}
                data={optionJenis}
                onselect={onSearch2}
                error={errorSearch2}
              />
              <Input label="Nama Penguji" name="nama_penguji" type="text" />
              <Input
                label="Jabatan Penguji"
                name="jabatan_penguji"
                type="text"
              />
              <Input label="Alamat Penguji" name="alamat_penguji" type="text" />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* MODAL DETAIL */}
      <ModalDetail
        title="Detail Anggota"
        isModalOpen={isModalDetailOpen}
        onClick={closeModal}
      >
        <ListDetail title="No SK" value={sk} />
        <ListDetail title="Nama Anggota" value={dataPurwaId?.anggota?.nama} />
        <ListDetail
          title="Asal Lembaga"
          value={dataPurwaId?.anggota?.lembaga?.nama_lembaga}
        />
        <ListDetail title="Jenis tkk" value={dataPurwaId?.jenis_tkk?.nama} />
        <ListDetail
          title="Tanggal dilantik"
          value={dateFormat(dataPurwaId?.tgl_purwa)}
        />
        <ListDetail title="Nama Penguji" value={dataPurwaId?.nama_penguji} />
        <ListDetail
          title="Jabatan Penguji"
          value={dataPurwaId?.jabatan_penguji}
        />
        <ListDetail
          title="Alamat Penguji"
          value={dataPurwaId?.alamat_penguji}
          style=""
        />
      </ModalDetail>
    </>
  );
};

export default TablePurwa;
