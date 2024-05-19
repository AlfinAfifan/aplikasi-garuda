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
  createUtama,
  deleteUtama,
  getUtama,
  getUtamaId,
  getYearUtama,
} from "../../../redux/actions/utama/utamaThunk";
import { formatSK } from "../DataFormat/FormatSK";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import InputDisabled from "../Form/InputDisabled";
import { getMadya, getOptionMadya } from "../../../redux/actions/madya/madyaThunk";
import ModalDetail from "../Modal/ModalDetail";
import ListDetail from "../Modal/ListDetail";
import ModalDelete from "../Modal/ModalDelete";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";

const TableUtama = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataUtama = useSelector((i) => i.utama.data);
  const dataUtamaId = useSelector((i) => i.utama.dataById);
  const typeAction = useSelector((i) => i.utama.type);
  const [initialValues, setInitialValues] = useState({
    id_madya: "",
    nama_penguji: "",
    jabatan_penguji: "",
    alamat_penguji: "",
  });
  const yearList = useSelector((i) => i.utama.yearList);
  const isLoading = useSelector((i) => i.utama.loading);
  const yearNow = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(yearNow);

  useEffect(() => {
    dispatch(getYearUtama());
    dispatch(getOptionMadya());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createUtama/fulfilled" ||
      typeAction === "deleteUtama/fulfilled"
    ) {
      dispatch(getUtama(selectedYear));
      dispatch(getYearUtama());
    }
  }, [typeAction]);

  useEffect(() => {
    dispatch(getUtama(selectedYear));
  }, [selectedYear]);

  // HANDLE SELECT SEARCH
  const dataAnggota = useSelector((i) => i.madya.data);
  const [jenisSelected, setJenisSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    value: data.id,
    label: `${data.anggota.nama} - ${data.jenis_tkk.nama}`,
    jenis: data.jenis_tkk.nama,
  }));

  // HANDLE FORM & VALIDASI
  const validationSchema = Yup.object().shape({
    id_madya: Yup.string().required("Anggota harus diisi"),
    nama_penguji: Yup.string().required("Nama harus diisi"),
    jabatan_penguji: Yup.string().required("Jabatan harus diisi"),
    alamat_penguji: Yup.string().required("Alamat harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createUtama({ id: values.id_madya, data: values }));
    closeModal();
  };

  // HANDLE DETAIL
  const [sk, setSk] = useState("");
  const handleDetail = async (id, sk) => {
    setSk(sk);
    setModalDetailOpen(true);
    dispatch(getUtamaId(id));
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

  const [idDelete, setIdDelete] = useState(null);

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Utama"
        clickAdd={openModal}
        dataLenght={dataUtama.length}
        yearList={yearList}
        yearNow={yearNow}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        isLoading={isLoading}
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
          {Array.isArray(dataUtama) ? (
            dataUtama.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{data.jenis_tkk.nama}</td>
                <td>{dateFormat(data.tgl_utama)}</td>
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
        title="Tambah Data Utama"
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
                name="id_madya"
                label="Nama"
                placeholder={"Cari Nama Anggota"}
                data={optionAnggota}
                onChange={(selected) => {
                  setFieldValue("id_madya", selected?.value);
                  setJenisSelected(selected?.jenis);
                }}
                value={
                  optionAnggota.find(
                    (option) => option.value === values.id_madya,
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
        <ListDetail title="Nama Anggota" value={dataUtamaId?.anggota?.nama} />
        <ListDetail
          title="Asal Lembaga"
          value={dataUtamaId?.anggota?.lembaga?.nama_lembaga}
        />
        <ListDetail title="Jenis tkk" value={dataUtamaId?.jenis_tkk?.nama} />
        <ListDetail
          title="Tanggal dilantik"
          value={dateFormat(dataUtamaId?.tgl_purwa)}
        />
        <ListDetail title="Nama Penguji" value={dataUtamaId?.nama_penguji} />
        <ListDetail
          title="Jabatan Penguji"
          value={dataUtamaId?.jabatan_penguji}
        />
        <ListDetail
          title="Alamat Penguji"
          value={dataUtamaId?.alamat_penguji}
          style=""
        />
      </ModalDetail>
      <ModalDelete
        title="Apakah anda yakin menghapus data ini?"
        handleDelete={() => {
          dispatch(deleteUtama(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableUtama;
