import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createRamu,
  deleteRamu,
  getRamu,
  getYearRamu,
} from "../../../redux/actions/ramu/ramuThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { formatSK } from "../DataFormat/FormatSK";
import { getAnggota } from "../../../redux/actions/anggota/anggotaThunk";
import SelectSearch from "../Form/SelectSearch";
import InputDisabled from "../Form/InputDisabled";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ModalDelete from "../Modal/ModalDelete";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";

const TableRamu = () => {
  // GET DATA
  const [lembagaSelected, setLembagaSelected] = useState("");
  const dispatch = useDispatch();
  const dataRamu = useSelector((i) => i.ramu.data);
  const typeAction = useSelector((i) => i.ramu.type);
  const [initialValues, setInitialValues] = useState({ id_anggota: "" });
  const yearList = useSelector((i) => i.ramu.yearList);
  const isLoading = useSelector((i) => i.ramu.loading);
  const yearNow = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(yearNow);
  const [dataSearch, setDataSearch] = useState(null);

  useEffect(() => {
    dispatch(getRamu(selectedYear));
    dispatch(getAnggota());
    dispatch(getYearRamu());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createRamu/fulfilled" ||
      typeAction === "deleteRamu/fulfilled"
    ) {
      dispatch(getRamu(selectedYear));
      dispatch(getYearRamu());
      setDataSearch(null);
    }
  }, [typeAction]);

  useEffect(() => {
    dispatch(getRamu(selectedYear));
  }, [selectedYear]);

  // GET ANGGOTA FOR CHOICE
  const dataAnggota = useSelector((i) => i.anggota.data);

  const optionAnggota = dataAnggota.map((data) => ({
    value: data.id,
    label: data.nama,
    lembaga: data.lembaga.nama_lembaga,
  }));

  // HANDLE FORM & VALIDASI
  const validationSchema = Yup.object().shape({
    id_anggota: Yup.number().required("Anggota harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createRamu(values));
    resetForm();
    closeModal();
  };

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
    setLembagaSelected("");
    document.body.style.overflow = "auto";
  };

  const [idDelete, setIdDelete] = useState(null);

  const handleSearch = (values) => {
    if (dataRamu?.length > 0) {
      const dataSearch = dataRamu?.filter((data) => {
        return (
          data.tgl_ramu.toLowerCase().includes(values.search.toLowerCase()) ||
          data.anggota.nama
            .toLowerCase()
            .includes(values.search.toLowerCase()) ||
          data.anggota.lembaga.nama_lembaga
            .toLowerCase()
            .includes(values.search.toLowerCase())
        );
      });
      setDataSearch(dataSearch);
    }
  };
  const dataFiltered = dataSearch ? dataSearch : dataRamu;

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Ramu"
        clickAdd={openModal}
        yearList={yearList}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        yearNow={yearNow}
        dataLenght={dataRamu?.length}
        isLoading={isLoading}
        handleSearch={handleSearch}
        setDataSearch={setDataSearch}
        searchPlacehold="Cari sesuai nama / asal lembaga"
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
          {Array.isArray(dataFiltered) ? (
            dataFiltered.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{formatSK(idx)}</td>
                <td>{data.anggota.nama}</td>
                <td>{data.anggota.lembaga.nama_lembaga}</td>
                <td>{dateFormat(data.tgl_ramu)}</td>
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
        title="Tambah Data Ramu"
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
          dispatch(deleteRamu(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableRamu;
