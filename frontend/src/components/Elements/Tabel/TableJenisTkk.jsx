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
  deleteJenisTkk,
  getJenisTkk,
  getJenisTkkById,
  updateJenisTkk,
} from "../../../redux/actions/jenisTkk/jenisTkkThunk";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ModalDelete from "../Modal/ModalDelete";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";

const TableJenisTkk = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataJenis = useSelector((i) => i.jenis.data);
  const dataJenisById = useSelector((i) => i.jenis.dataById);
  const typeAction = useSelector((i) => i.jenis.type);
  const [initialValues, setInitialValues] = useState({
    nama: "",
    bidang: "",
  });

  useEffect(() => {
    dispatch(getJenisTkk());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createJenisTkk/fulfilled" ||
      typeAction === "updateJenisTkk/fulfilled" ||
      typeAction === "deleteJenisTkk/fulfilled"
    ) {
      dispatch(getJenisTkk());
    }
    if (typeAction === "getJenisTkkById/fulfilled") {
      setInitialValues({
        nama: dataJenisById.nama || "",
        bidang: dataJenisById.bidang || "",
      });
    }
  }, [typeAction]);

  // HANDLE FORM & VALIDASI
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus diisi"),
    bidang: Yup.string().required("Bidang harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (Object.keys(dataJenisById).length === 0) {
      dispatch(createJenisTkk(values));
    } else {
      dispatch(updateJenisTkk({ id: dataJenisById.id, data: values }));
    }
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
    setInitialValues({
      nama: "",
      bidang: "",
    });
    document.body.style.overflow = "auto";
  };

  // HANDLE EDIT
  const handleEdit = (id) => {
    dispatch(getJenisTkkById(id));
    openModal();
  };

  // HANDLE DELETE
  const [idDelete, setIdDelete] = useState(null);

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
                  <TrashIcon
                    className="hover w-6 cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => {
                      dispatch(openModalDelete()), setIdDelete(data.id);
                    }}
                  />
                  <PencilSquareIcon
                    className="w-6 cursor-pointer text-third hover:text-first"
                    onClick={() => handleEdit(data.id)}
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
        title="Tambah Data Admin"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(form) => (
            <Form
              action="#"
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
            >
              <Input label="Nama" name="nama" type="text" />
              <Input label="Bidang" name="bidang" type="text" />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <ModalDelete
        title="Apakah anda yakin menghapus data ini?"
        handleDelete={() => {
          dispatch(deleteJenisTkk(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableJenisTkk;
