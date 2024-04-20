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
  getMadya,
  getMadyaId,
} from "../../../redux/actions/madya/madyaThunk";
import { formatSK } from "../DataFormat/FormatSK";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputDisabled from "../Form/InputDisabled";
import { getPurwa } from "../../../redux/actions/purwa/purwaThunk";
import SelectSearch from "../Form/SelectSearch";
import ModalDetail from "../Modal/ModalDetail";
import ListDetail from "../Modal/ListDetail";

const TableMadya = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataMadya = useSelector((i) => i.madya.data);
  const dataMadyaId = useSelector((i) => i.madya.dataById);
  const typeAction = useSelector((i) => i.madya.type);
  const [initialValues, setInitialValues] = useState({
    id_purwa: "",
    nama_penguji: "",
    jabatan_penguji: "",
    alamat_penguji: "",
  });

  useEffect(() => {
    dispatch(getMadya());
    dispatch(getPurwa());
  }, []);

  useEffect(() => {
    if (typeAction === "createMadya/fulfilled") {
      dispatch(getMadya());
    }
  }, [typeAction]);

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
    dispatch(createMadya({id: values.id_purwa, data: values}));
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

  return (
    <>
      <ShowDataLayout title="Tabel Data Madya" clickAdd={openModal}>
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
          {Array.isArray(dataMadya) ? (
            dataMadya.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{data.jenis_tkk.nama}</td>
                <td>{dateFormat(data.tgl_madya)}</td>
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
          {({values, setFieldValue}) => (
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
    </>
  );
};

export default TableMadya;
