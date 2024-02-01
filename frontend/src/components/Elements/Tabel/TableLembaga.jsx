import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createLembaga,
  getLembaga,
} from "../../../redux/actions/lembaga/lembagaThunk";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const TableLembaga = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Menghilangkan scroll pada body
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataLembaga = useSelector((i) => i.lembaga.data);
  const typeAction = useSelector((i) => i.lembaga.type);

  useEffect(() => {
    dispatch(getLembaga());
  }, [dispatch]);

  useEffect(() => {
    if (typeAction === "createLembaga/fulfilled") {
      dispatch(getLembaga());
    }
  }, [typeAction]);

  // HANDLE FORM & VALIDASI
  const initialValues = {
    nama_lembaga: "",
    alamat: "",
    no_gudep_lk: "",
    no_gudep_pr: "",
    kepsek: "",
    nip_kepsek: "",
  };

  const validationSchema = Yup.object().shape({
    nama_lembaga: Yup.string().required("Nama Lembaga harus diisi"),
    alamat: Yup.string().required("Alamat harus diisi"),
    no_gudep_lk: Yup.string().required("Nomor Gudep Putra harus diisi"),
    no_gudep_pr: Yup.string().required("Nomor Gudep Putri harus diisi"),
    kepsek: Yup.string().required("Kepala Sekolah harus diisi"),
    nip_kepsek: Yup.string().required("NIP Kepala Sekolah harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createLembaga(values));
    closeModal();
  };

  const handleOption = () => {
    console.log("Option");
  };

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Lembaga"
        clickAdd={openModal}
        clickOption={handleOption}
      >
        <THead>
          <tr>
            <td className="w-5">No</td>
            <td>Nama Lembaga</td>
            <td>Alamat</td>
            <td>Gudep Putra</td>
            <td>Gudep Putri</td>
            <td>Kepsek</td>
            <td>NIP Kepsek</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(dataLembaga) ? (
            dataLembaga.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{idx + 1}</td>
                <td>{data?.nama_lembaga}</td>
                <td>{data?.alamat}</td>
                <td>{data?.no_gudep_lk}</td>
                <td>{data?.no_gudep_pr}</td>
                <td>{data?.kepsek}</td>
                <td>{data?.nip_kepsek}</td>
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

      {/* Modal Input */}
      <Modal
        title="Tambah Data Lembaga"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
            >
              <Input label="Nama Lembaga" name="nama_lembaga" type="text" />
              <Input label="Alamat Lembaga" name="alamat" type="text" />
              <Input label="Nomor Gudep Putra" name="no_gudep_lk" type="text" />
              <Input label="Nomor Gudep Putri" name="no_gudep_pr" type="text" />
              <Input label="Kepala Sekolah" name="kepsek" type="text" />
              <Input label="NIP Kepala Sekolah" name="nip_kepsek" type="text" />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TableLembaga;
