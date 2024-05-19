import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createTerap,
  deleteTerap,
  getTerap,
  getYearTerap,
} from "../../../redux/actions/terap/terapThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import InputDisabled from "../Form/InputDisabled";
import { getOptionRakit, getRakit } from "../../../redux/actions/rakit/rakitThunk";
import ModalDelete from "../Modal/ModalDelete";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";

const TableTerap = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataTerap = useSelector((i) => i.terap.data);
  const typeAction = useSelector((i) => i.terap.type);
  const [initialValues, setInitialValues] = useState({ id_anggota: "" });
  const yearList = useSelector((i) => i.terap.yearList);
  const isLoading = useSelector((i) => i.terap.loading);
  const yearNow = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(yearNow);

  useEffect(() => {
    dispatch(getOptionRakit());
    dispatch(getYearTerap());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createTerap/fulfilled" ||
      typeAction === "deleteTerap/fulfilled"
    ) {
      dispatch(getTerap(selectedYear));
      dispatch(getYearTerap());
    }
  }, [typeAction]);

  useEffect(() => {
    dispatch(getTerap(selectedYear));
  }, [selectedYear]);

  // GET ANGGOTA FOR CHOICE
  const dataAnggota = useSelector((i) => i.rakit.data);
  const [lembagaSelected, setLembagaSelected] = useState("");

  const optionAnggota = dataAnggota.map((data) => ({
    value: data.id,
    label: data.anggota.nama,
    lembaga: data.anggota.lembaga.nama_lembaga,
  }));

  // HANDLE FORM & VALIDASI
  const validationSchema = Yup.object().shape({
    id_anggota: Yup.number().required("Anggota harus diisi"),
  });
  const onSubmit = (values) => {
    dispatch(createTerap({ id: values.id_anggota, data: values.id_anggota }));
    closeModal();
  };

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
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  const [idDelete, setIdDelete] = useState(null);
  return (
    <>
      <ShowDataLayout
        title="Tabel Data Terap"
        clickAdd={openModal}
        yearList={yearList}
        yearNow={yearNow}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dataLenght={dataTerap.length}
        isLoading={isLoading}
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
          {Array.isArray(dataTerap) ? (
            dataTerap.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{dateFormat(data.tgl_terap)}</td>
                <td className="flex gap-2">
                  <TrashIcon
                    className="hover w-6 cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => {
                      dispatch(openModalDelete()), setIdDelete(data.id);
                    }}
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
        title="Tambah Data Terap"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <Formik
          onSubmit={onSubmit}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form
              action="#"
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-40"
            >
              <SelectSearch
                name="id_anggota"
                label="Nama"
                placeholder={"Cari Nama Anggota"}
                data={optionAnggota}
                onChange={(selected) => {
                  setFieldValue("id_anggota", selected?.value);
                  setLembagaSelected(selected.lembaga);
                }}
                value={
                  optionAnggota.find(
                    (option) => option.value === values.id_anggota,
                  ) || ""
                }
              />
              <InputDisabled label="Asal Lembaga" value={lembagaSelected} />
              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <ModalDelete
        title="Apakah anda yakin menghapus data ini?"
        handleDelete={() => {
          dispatch(deleteTerap(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableTerap;
