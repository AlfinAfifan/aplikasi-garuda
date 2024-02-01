import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createJenisTkk,
  getJenisTkk,
} from "../../../redux/actions/jenisTkk/jenisTkkThunk";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const TableJenisTkk = () => {
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
    document.body.style.overflow = "auto";
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataJenis = useSelector((i) => i.jenis.data);
  const typeAction = useSelector((i) => i.jenis.type);

  useEffect(() => {
    dispatch(getJenisTkk());
  }, []);

  useEffect(() => {
    if (typeAction === "createJenisTkk/fulfilled") {
      dispatch(getJenisTkk());
    }
  }, [typeAction]);

  // HANDLE FORM & VALIDASI
  const initialValues = {
    nama: "",
    bidang: "",
    warna: "",
  };

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus diisi"),
    bidang: Yup.string().required("Bidang harus diisi"),
    warna: Yup.string().required("Warna harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createJenisTkk(values));
    closeModal();
  };

  return (
    <>
      <ShowDataLayout title="Tabel Data Admin" clickAdd={openModal}>
        <THead>
          <tr>
            <td>No</td>
            <td>Jenis TKK</td>
            <td>Bidang</td>
            <td>Warna</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(dataJenis) ? (
            dataJenis.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{idx + 1}</td>
                <td>{data.nama}</td>
                <td>{data.bidang}</td>
                <td>{data.warna}</td>

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
        title="Tambah Data Admin"
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
              <Input label="Nama" name="nama" type="text" />
              <Input label="Bidang" name="bidang" type="text" />
              <Input label="Warna" name="warna" type="text" />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TableJenisTkk;
