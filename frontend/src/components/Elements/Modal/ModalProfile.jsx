import { XMarkIcon } from "@heroicons/react/24/solid";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SelectOpt from "../Form/SelectOpt";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { optionAgama } from "../../../models/option";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAdmin } from "../../../redux/actions/admin/adminThunk";

const ModalProfile = ({ isModalOpen, setModalOpen, onClick }) => {
  const getUser = JSON.parse(localStorage.getItem("user"));

  const [initialValues, setInitialValues] = useState({
    namaUser: "",
    alamatUser: "",
    emailUser: "",
    passwordUser: "",
    tmpt_lahirUser: "",
    tgl_lahirUser: "",
    agamaUser: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_DOMAIN}/admin/${getUser.userid}`, {
        withCredentials: true,
      })
      .then((response) => {
        setInitialValues({
          namaUser: response.data.nama,
          alamatUser: response.data.alamat,
          emailUser: response.data.email,
          passwordUser: response.data.password,
          tmpt_lahirUser: response.data.tmpt_lahir,
          tgl_lahirUser: response.data.tgl_lahir,
          agamaUser: response.data.agama,
        });
      });
  }, []);

  const validationSchema = Yup.object().shape({
    namaUser: Yup.string().required("Nama harus diisi"),
    alamatUser: Yup.string().required("Alamat harus diisi"),
    emailUser: Yup.string().email().required("Email harus diisi"),
    passwordUser: Yup.string().required("Password harus diisi"),
    tmpt_lahirUser: Yup.string().required("Tempat lahir harus diisi"),
    tgl_lahirUser: Yup.string().required("Tanggal lahir harus diisi"),
    agamaUser: Yup.string().required("Agama harus diisi"),
  });

  const dispatch = useDispatch()
  const onSubmit = (values) => {
    dispatch(updateAdmin({ id: getUser.userid, data: values }));
    setModalOpen(false)
  };
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-30 ${isModalOpen ? "bg-black/40 backdrop-blur-[1px]" : "hidden"}`}
        onClick={onClick}
      ></div>
      <div
        className={`fixed bottom-0 top-0 z-30 flex w-[500px] overflow-auto rounded-s-lg bg-white p-8 shadow-md duration-500 ${isModalOpen ? "right-0" : "-right-[500px]"}`}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <h1 className="font-montserrat text-xl font-semibold text-second">
              Profile
            </h1>
            <div
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-second hover:text-white"
              onClick={onClick}
            >
              <XMarkIcon className="w-6" />
            </div>
          </div>
          <div className="w-ful mt-2 h-0.5 rounded-full bg-second opacity-75">
            <h1 className="opacity-0">kunci</h1>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            <Form className="mt-8 grid grid-cols-2 gap-4 pb-10">
              <div className="col-span-2">
                <Input label="Nama" name="namaUser" type="text" />
              </div>
              <div className="col-span-2">
                <Input label="Alamat" name="alamatUser" type="text" />
              </div>
              <Input label="Email" name="emailUser" type="email" />
              <Input label="Password" name="passwordUser" type="password" />
              <div className="col-span-2">
                <Input label="Tempat Lahir" name="tmpt_lahirUser" type="text" />
              </div>
              <Input label="Tanggal Lahir" name="tgl_lahirUser" type="date" />
              <SelectOpt
                label="Agama"
                name="agamaUser"
                placeholder="Silahkan pilih agama"
                options={optionAgama}
              />

              <Button>Simpan</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalProfile;
