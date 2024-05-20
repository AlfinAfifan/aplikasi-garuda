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
import {
  createMadya,
  deleteMadya,
  getMadya,
  getMadyaId,
  getYearMadya,
} from "../../../redux/actions/madya/madyaThunk";
import { formatSK } from "../DataFormat/FormatSK";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputDisabled from "../Form/InputDisabled";
import {
  getOptionPurwa,
} from "../../../redux/actions/purwa/purwaThunk";
import SelectSearch from "../Form/SelectSearch";
import ModalDetail from "../Modal/ModalDetail";
import ListDetail from "../Modal/ListDetail";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";
import ModalDelete from "../Modal/ModalDelete";

const TableMadya = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataMadya = useSelector((i) => i.madya.data);
  const dataMadyaId = useSelector((i) => i.madya.dataById);
  const typeAction = useSelector((i) => i.madya.type);
  const isLoading = useSelector((i) => i.madya.loading);
  const [initialValues, setInitialValues] = useState({
    id_purwa: "",
    nama_penguji: "",
    jabatan_penguji: "",
    alamat_penguji: "",
  });
  const yearList = useSelector((i) => i.madya.yearList);
  const yearNow = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(yearNow);
  const [dataSearch, setDataSearch] = useState(null);

  useEffect(() => {
    dispatch(getMadya(selectedYear));
    dispatch(getOptionPurwa());
    dispatch(getYearMadya());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createMadya/fulfilled" ||
      typeAction === "deleteMadya/fulfilled"
    ) {
      dispatch(getMadya(selectedYear));
      dispatch(getYearMadya());
      setDataSearch(null);
    }
  }, [typeAction]);

  useEffect(() => {
    dispatch(getMadya(selectedYear));
  }, [selectedYear]);

  // HANDLE SELECT SEARCH
  const dataAnggota = useSelector((i) => i.purwa.data);
  const [jenisSelected, setJenisSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    value: data.id,
    label: `${data.anggota.nama} - ${data.jenis_tkk.nama}`,
    jenis: data.jenis_tkk.nama,
  }));

  // HANDLE FORM & VALIDASI
  const validationSchema = Yup.object().shape({
    id_purwa: Yup.string().required("Anggota harus diisi"),
    nama_penguji: Yup.string().required("Nama harus diisi"),
    jabatan_penguji: Yup.string().required("Jabatan harus diisi"),
    alamat_penguji: Yup.string().required("Alamat harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createMadya({ id: values.id_purwa, data: values }));
    closeModal();
  };

  // HANDLE DETAIL
  const [sk, setSk] = useState("");
  const handleDetail = async (id, sk) => {
    setSk(sk);
    setModalDetailOpen(true);
    dispatch(getMadyaId(id));
  };

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
    setJenisSelected("");
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  // HANDLE DELETE
  const [idDelete, setIdDelete] = useState(null);

  const handleSearch = (values) => {
    if (dataMadya?.length > 0) {
      const dataSearch = dataMadya?.filter((data) => {
        return (
          data.tgl_madya.toLowerCase().includes(values.search.toLowerCase()) ||
          data.anggota.nama
            .toLowerCase()
            .includes(values.search.toLowerCase()) ||
          data.anggota.lembaga.nama_lembaga
            .toLowerCase()
            .includes(values.search.toLowerCase()) ||
          data.jenis_tkk.nama
            .toLowerCase()
            .includes(values.search.toLowerCase())
        );
      });
      setDataSearch(dataSearch);
    }
  };
  const dataFiltered = dataSearch ? dataSearch : dataMadya;

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Madya"
        clickAdd={openModal}
        dataLenght={dataMadya?.length}
        yearList={yearList}
        yearNow={yearNow}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        isLoading={isLoading}
        handleSearch={handleSearch}
        setDataSearch={setDataSearch}
        searchPlacehold="Cari sesuai nama / asal lembaga / jenis tkk"
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
          {Array.isArray(dataFiltered) ? (
            dataFiltered.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{data.jenis_tkk.nama}</td>
                <td>{dateFormat(data.tgl_madya)}</td>
                <td className="flex gap-2">
                  <TrashIcon
                    className="hover w-6 cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => {
                      dispatch(openModalDelete()), setIdDelete(data.id);
                    }}
                  />
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
        title="Tambah Data Madya"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form
              action="#"
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
            >
              <SelectSearch
                name="id_purwa"
                label="Nama"
                placeholder={"Cari Nama Anggota"}
                data={optionAnggota}
                onChange={(selected) => {
                  setFieldValue("id_purwa", selected?.value);
                  setJenisSelected(selected?.jenis);
                }}
                value={
                  optionAnggota.find(
                    (option) => option.value === values.id_purwa,
                  ) || ""
                }
              />
              <InputDisabled label="Jenis TKK" value={jenisSelected} />
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
        <ListDetail title="Nama Anggota" value={dataMadyaId?.anggota?.nama} />
        <ListDetail
          title="Asal Lembaga"
          value={dataMadyaId?.anggota?.lembaga?.nama_lembaga}
        />
        <ListDetail title="Jenis tkk" value={dataMadyaId?.jenis_tkk?.nama} />
        <ListDetail
          title="Tanggal dilantik"
          value={dateFormat(dataMadyaId?.tgl_purwa)}
        />
        <ListDetail title="Nama Penguji" value={dataMadyaId?.nama_penguji} />
        <ListDetail
          title="Jabatan Penguji"
          value={dataMadyaId?.jabatan_penguji}
        />
        <ListDetail
          title="Alamat Penguji"
          value={dataMadyaId?.alamat_penguji}
          style=""
        />
      </ModalDetail>
      <ModalDelete
        title="Apakah anda yakin menghapus data ini?"
        handleDelete={() => {
          dispatch(deleteMadya(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableMadya;
