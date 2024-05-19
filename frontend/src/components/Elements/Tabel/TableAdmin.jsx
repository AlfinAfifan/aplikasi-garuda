import React, { useEffect, useRef, useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
} from "../../../redux/actions/admin/adminThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getLembaga } from "../../../redux/actions/lembaga/lembagaThunk";
import SelectSearch from "../Form/SelectSearch";
import ModalDelete from "../Modal/ModalDelete";
import {
  closeModalDelete,
  openModalDelete,
} from "../../../redux/actions/modal/modalSlice";

const TableAdmin = () => {
  // GET LEMBAGA FOR CHOICE
  const dataLembaga = useSelector((i) => i.lembaga.data);

  const optionLembaga = dataLembaga.map((data) => ({
    value: data.id,
    label: data.nama_lembaga,
  }));

  // GET DATA
  const dispatch = useDispatch();
  const dataAdmin = useSelector((i) => i.admin.data);
  const dataAdminById = useSelector((i) => i.admin.dataById);
  const typeAction = useSelector((i) => i.admin.type);
  const isLoading = useSelector((i) => i.admin.loading);
  const [initialValues, setInitialValues] = useState({
    nama: "",
    id_lembaga: "",
    alamat: "",
    email: "",
    nta: "",
    tmpt_lahir: "",
    tgl_lahir: "",
    jabatan: "",
    agama: "",
  });

  useEffect(() => {
    dispatch(getAdmin());
    dispatch(getLembaga());
  }, []);

  useEffect(() => {
    if (
      typeAction === "createAdmin/fulfilled" ||
      typeAction === "updateAdmin/fulfilled" ||
      typeAction === "deleteAdmin/fulfilled"
    ) {
      dispatch(getAdmin());
    }

    if (typeAction === "getAdminById/fulfilled") {
      setInitialValues({
        nama: dataAdminById.nama || "",
        id_lembaga: dataAdminById.id_lembaga || "",
        alamat: dataAdminById.alamat || "",
        email: dataAdminById.email || "",
        nta: dataAdminById.nta || "",
        tmpt_lahir: dataAdminById.tmpt_lahir || "",
        tgl_lahir: dataAdminById.tgl_lahir || "",
        jabatan: dataAdminById.jabatan || "",
        agama: dataAdminById.agama || "",
      });
    }
  }, [typeAction]);

  // HANDLE FORM & VALIDASI
  const optionAgama = [
    { key: "Islam", value: "islam" },
    { key: "Kristen", value: "kristen" },
  ];
  const optionJabatan = [
    { key: "Pembina", value: "pembina" },
    { key: "Guru", value: "guru" },
  ];

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus diisi"),
    id_lembaga: Yup.number().required("Lembaga harus diisi"),
    alamat: Yup.string().required("Alamat harus diisi"),
    email: Yup.string().email().required("Email harus diisi"),
    nta: Yup.string().required("NTA harus diisi"),
    tmpt_lahir: Yup.string().required("Tempat lahir harus diisi"),
    tgl_lahir: Yup.string().required("Tanggal lahir harus diisi"),
    jabatan: Yup.string().required("Jabatan harus diisi"),
    agama: Yup.string().required("Agama harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (Object.keys(dataAdminById).length === 0) {
      dispatch(createAdmin(values));
    } else {
      dispatch(updateAdmin({ id: dataAdminById.id, data: values }));
    }
    closeModal();
  };

  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const openModalInput = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    formRef.current.reset();
    setInitialValues({
      nama: "",
      id_lembaga: "",
      alamat: "",
      email: "",
      nta: "",
      tmpt_lahir: "",
      tgl_lahir: "",
      jabatan: "",
      agama: "",
    });
    document.body.style.overflow = "auto";
  };

  // HANDLE EDIT
  const handleEdit = (id) => {
    dispatch(getAdminById(id));
    openModalInput();
  };

  // HANDLE DELETE
  const [idDelete, setIdDelete] = useState(null);

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Admin"
        descript="*Gunakan alamat email admin untuk mengisi form email dan password login"
        clickAdd={openModalInput}
        dataLenght={dataAdmin.length}
        isLoading={isLoading}
      >
        <THead>
          <tr>
            <td className="w-5">No</td>
            <td>Nama</td>
            <td>Asal Lembaga</td>
            <td>NTA</td>
            <td>Tempat/Tanggal Lahir</td>
            <td>Alamat</td>
            <td>Agama</td>
            <td>Jabatan</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(dataAdmin) ? (
            dataAdmin.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{idx + 1}</td>
                <td>{data.nama}</td>
                <td>{data.lembaga?.nama_lembaga}</td>
                <td>{data.nta}</td>
                <td>{`${data.tmpt_lahir}, ${dateFormat(data.tgl_lahir)}`}</td>
                <td>{data.alamat}</td>
                <td>{data.agama}</td>
                <td>{data.jabatan}</td>
                <td className="flex gap-2">
                  <TrashIcon
                    className="hover w-6 cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => {
                      dispatch(openModalDelete()), setIdDelete(data.id);
                    }}
                  />
                  <PencilSquareIcon
                    className="w-6 cursor-pointer text-third hover:text-first"
                    onClick={() => handleEdit(data?.id)}
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
          {({ values, setFieldValue }) => (
            <Form
              action="#"
              ref={formRef}
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-4 pb-10"
            >
              <Input label="Nama" name="nama" type="text" />
              <Input label="Email" name="email" type="email" />
              <SelectSearch
                name="id_lembaga"
                label="Asal Lembaga"
                placeholder="Cari Nama Lembaga"
                data={optionLembaga}
                value={
                  optionLembaga.find(
                    (option) => option.value === values.id_lembaga,
                  ) || ""
                }
                onChange={(selected) => {
                  setFieldValue("id_lembaga", selected?.value);
                }}
              />
              <Input label="NTA" name="nta" type="text" />
              <Input label="Tempat Lahir" name="tmpt_lahir" type="text" />
              <Input label="Tanggal Lahir" name="tgl_lahir" type="date" />
              <Input label="Alamat" name="alamat" type="text" />
              <SelectOpt
                label="Agama"
                name="agama"
                placeholder="Silahkan pilih agama"
                options={optionAgama}
              />
              <SelectOpt
                label="Jabatan"
                name="jabatan"
                placeholder="Silahkan pilih jabatan"
                options={optionJabatan}
              />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <ModalDelete
        title="Apakah anda yakin menghapus data ini?"
        handleDelete={() => {
          dispatch(deleteAdmin(idDelete)), dispatch(closeModalDelete());
        }}
      />
    </>
  );
};

export default TableAdmin;
