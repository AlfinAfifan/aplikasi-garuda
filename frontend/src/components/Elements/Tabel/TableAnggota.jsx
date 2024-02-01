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
import SelectOpt from "../Form/SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnggota,
  getAnggota,
} from "../../../redux/actions/anggota/anggotaThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import { getLembaga } from "../../../redux/actions/lembaga/lembagaThunk";

const TableAnggota = () => {
  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
    setSearchResult(null);
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataAnggota = useSelector((i) => i.anggota.data);
  const typeAction = useSelector((i) => i.anggota.type);

  useEffect(() => {
    dispatch(getAnggota());
    dispatch(getLembaga());
  }, []);

  useEffect(() => {
    if (typeAction === "createAnggota/fulfilled") {
      dispatch(getAnggota());
    }
  }, [typeAction]);

  // GET LEMBAGA FOR CHOICE
  const dataLembaga = useSelector((i) => i.lembaga.data);
  const [searchResult, setSearchResult] = useState(null);
  const [errorSearch, setErrorSearch] = useState(false);
  const [selected, setSelected] = useState("");

  const optionLembaga = dataLembaga.map((data) => ({
    id: data.id,
    key: data.id,
    value: data.nama_lembaga,
  }));
  const onSearch = (record) => {
    setSearchResult(record.item.id);
    setSelected(record.item.value);
  };

  // HANDLE FORM & VALIDASI
  const optionGender = [
    { key: "Laki - Laki", value: "laki - laki" },
    { key: "Perempuan", value: "perempuan" },
  ];
  const optionAgama = [
    { key: "Islam", value: "islam" },
    { key: "Kristen", value: "kristen" },
  ];
  const optionWarga = [
    { key: "WNI (Warga Negara Indonesia)", value: "wni" },
    { key: "WNA (Warga Negara Asing)", value: "wna" },
  ];
  const initialValues = {
    nama: "",
    nta: "",
    no_induk: "",
    gender: "",
    tmpt_lahir: "",
    tgl_lahir: "",
    agama: "",
    warga: "",
    rt: "",
    rw: "",
    ds_kelurahan: "",
    kecamatan: "",
    kab_kota: "",
    provinsi: "",
    map: "",
    no_telp: "",
    bakat_hobi: "",
    nama_ayah: "",
    tmpt_lahir_ayah: "",
    tgl_lahir_ayah: "",
    nama_ibu: "",
    tmpt_lahir_ibu: "",
    tgl_lahir_ibu: "",
    alamat_ortu: "",
    no_telp_ortu: "",
    tgl_masuk_pangkalan: "",
    tingkat_masuk: "",
    tgl_keluar_pangkalan: "",
    alasan_keluar: "",
  };

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus diisi"),
    nta: Yup.number().required("NTA harus diisi"),
    no_induk: Yup.number().required("No induk harus diisi"),
    gender: Yup.string().required("Jenis kelamin harus diisi"),
    tmpt_lahir: Yup.string().required("Tempat lahir harus diisi"),
    tgl_lahir: Yup.date().required("Tanggal lahir harus diisi"),
    agama: Yup.string().required("Agama harus diisi"),
    warga: Yup.string().required("Kewarganegaraan harus diisi"),
    rt: Yup.number().required("RT harus diisi"),
    rw: Yup.number().required("RW harus diisi"),
    ds_kelurahan: Yup.string().required("Desa / Kelurahan harus diisi"),
    kecamatan: Yup.string().required("Kecamatan harus diisi"),
    kab_kota: Yup.string().required("Kabupaten / Kota harus diisi"),
    provinsi: Yup.string().required("Provinsi harus diisi"),
    map: Yup.string().required(),
    no_telp: Yup.number().required("Nomor telepon harus diisi"),
    bakat_hobi: Yup.string().required("Bakat / hobi harus diisi"),
    nama_ayah: Yup.string().required("Nama ayah harus diisi"),
    tmpt_lahir_ayah: Yup.string().required("Tempat lahir ayah harus diisi"),
    tgl_lahir_ayah: Yup.date().required("Tanggal lahir ayah harus diisi"),
    nama_ibu: Yup.string().required("Nama ibu harus diisi"),
    tmpt_lahir_ibu: Yup.string().required("Tempat lahir ibu harus diisi"),
    tgl_lahir_ibu: Yup.date().required("Tanggal lahir ibu harus diisi"),
    alamat_ortu: Yup.string().required("Alamat ortu harus diisi"),
    no_telp_ortu: Yup.number().required("No telepon ortu harus diisi"),
    tgl_masuk_pangkalan: Yup.date().required(
      "Tanggal masuk pangkalan harus diisi",
    ),
    tingkat_masuk: Yup.string().required("Tingkat masuk pangkalan harus diisi"),
    tgl_keluar_pangkalan: Yup.date().required(
      "Tanggal keluar pangkalan harus diisi",
    ),
    alasan_keluar: Yup.string().required("Alasan keluar pangkalan harus diisi"),
  });

  const onSubmit = (values, { resetForm }) => {
    const dataCreate = {
      ...values,
      id_lembaga: searchResult,
    };

    if (searchResult) {
      dispatch(createAnggota(dataCreate));
      closeModal();
    } else {
      setErrorSearch(true);
    }
  };

  return (
    <>
      <ShowDataLayout title="Tabel Data Anggota" clickAdd={openModal}>
        <THead>
          <tr>
            <td className="w-5">No</td>
            <td>Nama</td>
            <td>Asal Lembaga</td>
            <td>No Induk</td>
            <td>NTA</td>
            <td>Jenis Kelamin</td>
            <td>Tempat/Tanggal Lahir</td>
            <td>No Telp</td>
            <td className="w-5">Action</td>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(dataAnggota) ? (
            dataAnggota.map((data, idx) => (
              <tr className="capitalize" key={idx}>
                <td className="font-bold">{idx + 1}</td>
                <td>{data.nama}</td>
                <td>{data.lembaga.nama_lembaga}</td>
                <td>{data.no_induk}</td>
                <td>{data.nta}</td>
                <td>{data.gender}</td>
                <td>{`${data.tmpt_lahir}, ${dateFormat(data.tgl_lahir)}`}</td>
                <td>{data.no_telp}</td>
                <td className="flex gap-2">
                  <TrashIcon className="hover w-6 cursor-pointer text-red-600 hover:text-red-700" />
                  <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
                  <DocumentTextIcon className="w-6 cursor-pointer text-amber-500 hover:text-amber-600" />
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
        title="Tambah Data Anggota"
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
              className="mt-8 grid grid-cols-2 gap-x-10 gap-y-4 pb-10"
            >
              <Input label="Nama" name="nama" type="text" />
              <SelectSearch
                name="lembaga"
                label="Asal Lembaga"
                placeholder={selected ? selected : "Cari Nama Lembaga"}
                data={optionLembaga}
                onselect={onSearch}
                error={errorSearch}
              />
              <Input label="Nomor Induk" name="no_induk" type="number" />
              <Input label="NTA" name="nta" type="number" />
              <Input label="Tempat Lahir" name="tmpt_lahir" type="text" />
              <Input label="Tanggal Lahir" name="tgl_lahir" type="date" />
              <SelectOpt
                label="Jenis Kelamin"
                name="gender"
                placeholder="Silahkan pilih kelamin"
                options={optionGender}
              />
              <SelectOpt
                label="Agama"
                name="agama"
                placeholder="Silahkan pilih agama"
                options={optionAgama}
              />
              <SelectOpt
                label="Kewarganegaraan"
                name="warga"
                placeholder="Silahkan kewarganegaraan"
                options={optionWarga}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="RT" name="rt" type="number" />
                <Input label="RW" name="rw" type="number" />
              </div>
              <Input label="Desa / Kelurahan" name="ds_kelurahan" type="text" />
              <Input label="Kecamatan" name="kecamatan" type="text" />
              <Input label="Kabupaten / Kota" name="kab_kota" type="text" />
              <Input label="Provinsi" name="provinsi" type="text" />
              <Input label="Map" name="map" type="text" />
              <Input label="No Telepon" name="no_telp" type="number" />
              <Input label="Bakat / Hobi" name="bakat_hobi" type="text" />
              <Input label="Nama Ayah" name="nama_ayah" type="text" />
              <Input
                label="Tempat Lahir Ayah"
                name="tmpt_lahir_ayah"
                type="text"
              />
              <Input
                label="Tanggal Lahir Ayah"
                name="tgl_lahir_ayah"
                type="date"
              />
              <Input label="Nama Ibu" name="nama_ibu" type="text" />
              <Input
                label="Tempat Lahir Ibu"
                name="tmpt_lahir_ibu"
                type="text"
              />
              <Input
                label="Tanggal Lahir Ibu"
                name="tgl_lahir_ibu"
                type="date"
              />
              <Input label="Alamat Orang Tua" name="alamat_ortu" type="text" />
              <Input
                label="No Telepon Orang Tua"
                name="no_telp_ortu"
                type="number"
              />
              <Input
                label="Tanggal Masuk Pangkalan"
                name="tgl_masuk_pangkalan"
                type="date"
              />
              <Input
                label="Tingkat Masuk Pangkalan"
                name="tingkat_masuk"
                type="text"
              />
              <Input
                label="Tanggal Keluar Pangkalan"
                name="tgl_keluar_pangkalan"
                type="date"
              />
              <Input
                label="Alasan Keluar Pangkalan"
                name="alasan_keluar"
                type="text"
              />

              <Button>Simpan</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TableAnggota;
