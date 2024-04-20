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
  getAnggotaById,
  updateAnggota,
} from "../../../redux/actions/anggota/anggotaThunk";
import { dateFormat } from "../DataFormat/DateFormat";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectSearch from "../Form/SelectSearch";
import { getLembaga } from "../../../redux/actions/lembaga/lembagaThunk";
import ModalDetail from "../Modal/ModalDetail";
import ListDetail from "../Modal/ListDetail";

const TableAnggota = () => {
  // GET DATA
  const dispatch = useDispatch();
  const dataAnggota = useSelector((i) => i.anggota.data);
  const dataAnggotaById = useSelector((i) => i.anggota.dataById);
  const typeAction = useSelector((i) => i.anggota.type);
  const [initialValues, setInitialValues] = useState({
    nama: "",
    id_lembaga: "",
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
    // map: "",
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
  });

  useEffect(() => {
    dispatch(getAnggota());
    dispatch(getLembaga());
  }, []);

  console.log(typeAction);
  useEffect(() => {
    if (
      typeAction === "createAnggota/fulfilled" ||
      typeAction === "updateAnggota/fulfilled"
    ) {
      dispatch(getAnggota());
    }
    if (typeAction === "getAnggotaById/fulfilled") {
      setInitialValues({
        nama: dataAnggotaById.nama || "",
        id_lembaga: dataAnggotaById.id_lembaga || "",
        nta: dataAnggotaById.nta || "",
        no_induk: dataAnggotaById.no_induk || "",
        gender: dataAnggotaById.gender || "",
        tmpt_lahir: dataAnggotaById.tmpt_lahir || "",
        tgl_lahir: dataAnggotaById.tgl_lahir || "",
        agama: dataAnggotaById.agama || "",
        warga: dataAnggotaById.warga || "",
        rt: dataAnggotaById.rt || "",
        rw: dataAnggotaById.rw || "",
        ds_kelurahan: dataAnggotaById.ds_kelurahan || "",
        kecamatan: dataAnggotaById.kecamatan || "",
        kab_kota: dataAnggotaById.kab_kota || "",
        provinsi: dataAnggotaById.provinsi || "",
        // map: dataAnggotaById.map || '',
        no_telp: dataAnggotaById.no_telp || "",
        bakat_hobi: dataAnggotaById.bakat_hobi || "",
        nama_ayah: dataAnggotaById.nama_ayah || "",
        tmpt_lahir_ayah: dataAnggotaById.tmpt_lahir_ayah || "",
        tgl_lahir_ayah: dataAnggotaById.tgl_lahir_ayah || "",
        nama_ibu: dataAnggotaById.nama_ibu || "",
        tmpt_lahir_ibu: dataAnggotaById.tmpt_lahir_ibu || "",
        tgl_lahir_ibu: dataAnggotaById.tgl_lahir_ibu || "",
        alamat_ortu: dataAnggotaById.alamat_ortu || "",
        no_telp_ortu: dataAnggotaById.no_telp_ortu || "",
        tgl_masuk_pangkalan: dataAnggotaById.tgl_masuk_pangkalan || "",
        tingkat_masuk: dataAnggotaById.tingkat_masuk || "",
        tgl_keluar_pangkalan: dataAnggotaById.tgl_keluar_pangkalan || "",
        alasan_keluar: dataAnggotaById.alasan_keluar || "",
      });
    }
  }, [typeAction]);

  // GET LEMBAGA FOR CHOICE
  const dataLembaga = useSelector((i) => i.lembaga.data);

  const optionLembaga = dataLembaga.map((data) => ({
    value: data.id,
    label: data.nama_lembaga,
  }));

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

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus diisi"),
    id_lembaga: Yup.number().required("Lembaga harus diisi"),
    nta: Yup.number().required("NTA harus diisi"),
    no_induk: Yup.number().required("No induk harus diisi"),
    gender: Yup.string().required("Jenis kelamin harus diisi"),
    tmpt_lahir: Yup.string().required("Tempat lahir harus diisi"),
    tgl_lahir: Yup.date().required("Tanggal lahir harus diisi"),
    no_telp: Yup.number().required("Nomor Telepon harus diisi"),
    agama: Yup.string(),
    warga: Yup.string(),
    rt: Yup.number(),
    rw: Yup.number(),
    ds_kelurahan: Yup.string(),
    kecamatan: Yup.string(),
    kab_kota: Yup.string(),
    provinsi: Yup.string(),
    // map: Yup.string().required(),
    bakat_hobi: Yup.string(),
    nama_ayah: Yup.string(),
    tmpt_lahir_ayah: Yup.string(),
    tgl_lahir_ayah: Yup.date(),
    nama_ibu: Yup.string(),
    tmpt_lahir_ibu: Yup.string(),
    tgl_lahir_ibu: Yup.date(),
    alamat_ortu: Yup.string(),
    no_telp_ortu: Yup.number(),
    tgl_masuk_pangkalan: Yup.date(),
    tingkat_masuk: Yup.string(),
  });

  const onSubmit = (values) => {
    Object.keys(values).forEach((key) => {
      if (values[key] === "") {
        values[key] = null;
      }
    });
    if (Object.keys(dataAnggotaById).length === 0) {
      dispatch(createAnggota(values));
    } else {
      dispatch(updateAnggota({ id: dataAnggotaById.id, data: values }));
    }
    closeModal();
  };

  // HANDLE DETAIL
  const handleDetail = async (id) => {
    setModalDetailOpen(true);
    dispatch(getAnggotaById(id));
  };

  // HANDLE MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalDetailOpen, setModalDetailOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const formRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    setModalDetailOpen(false);
    formRef.current.reset();
    setInitialValues({
      nama: "",
      id_lembaga: "",
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
      // map: "",
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
    });
    document.body.style.overflow = "auto";
  };

  // HANDLE EDIT
  const handleEdit = (id) => {
    dispatch(getAnggotaById(id));
    openModal();
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
                  <PencilSquareIcon
                    className="w-6 cursor-pointer text-third hover:text-first"
                    onClick={() => handleEdit(data.id)}
                  />
                  <DocumentTextIcon
                    className="w-6 cursor-pointer text-amber-500 hover:text-amber-600"
                    onClick={() => handleDetail(data.id)}
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
        title="Tambah Data Anggota"
        isModalOpen={isModalOpen}
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
              <SelectSearch
                name="id_lembaga"
                label="Asal Lembaga"
                placeholder="Cari Nama Lembaga"
                data={optionLembaga}
                value={optionLembaga.find(
                  (option) => option.value === values.id_lembaga,
                ) || ''}
                onChange={(selected) => {
                  setFieldValue("id_lembaga", selected?.value);
                }}
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
              <Input label="No Telepon" name="no_telp" type="number" />
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
              {/* <Input label="Map" name="map" type="text" /> */}
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

      {/* MODAL DETAIL */}
      <ModalDetail
        title="Detail Anggota"
        isModalOpen={isModalDetailOpen}
        onClick={closeModal}
      >
        <ListDetail title="Nama Anggota" value={dataAnggotaById?.nama} />
        <ListDetail
          title="Asal Lembaga"
          value={dataAnggotaById?.lembaga?.nama_lembaga}
        />
        <ListDetail title="No Induk" value={dataAnggotaById?.no_induk} />
        <ListDetail title="NTA" value={dataAnggotaById?.nta} />
        <ListDetail
          title="TTL"
          value={`${dataAnggotaById?.tmpt_lahir}, ${dateFormat(dataAnggotaById?.tgl_lahir)}`}
        />
        <ListDetail title="Jenis Kelamin" value={dataAnggotaById?.gender} />
        <ListDetail title="Agama" value={dataAnggotaById?.agama} />
        <ListDetail title="Bakat / Hobi" value={dataAnggotaById?.bakat_hobi} />
        <ListDetail title="No Telepon" value={dataAnggotaById?.no_telp} />
        <ListDetail
          title="Kewarganegaraan"
          value={dataAnggotaById?.warga}
          style="uppercase"
        />
        <ListDetail
          title="Alamat"
          value={`RT ${dataAnggotaById?.rt}, RW ${dataAnggotaById?.rw}, Desa/Kelurahan ${dataAnggotaById?.ds_kelurahan}, Kecamatan ${dataAnggotaById?.kecamatan}, Kabupaten ${dataAnggotaById?.kab_kota}, Provinsi ${dataAnggotaById?.provinsi}`}
        />

        {/* IDENTITAS ORTU */}
        <div className="col-span-2 mt-5 flex flex-col items-center gap-2">
          <h1 className="text-gray-500">Data Orang Tua</h1>
          <div className=" h-0.5 w-full rounded-full bg-gray-200"></div>
        </div>
        <ListDetail title="Nama Ayah" value={dataAnggotaById?.nama_ayah} />
        <ListDetail
          title="TTL Ayah"
          value={`${dataAnggotaById?.tmpt_lahir_ayah}, ${dateFormat(dataAnggotaById?.tgl_lahir_ayah)}`}
        />
        <ListDetail title="Nama Ibu" value={dataAnggotaById?.nama_ibu} />
        <ListDetail
          title="TTL Ibu"
          value={`${dataAnggotaById?.tmpt_lahir_ibu}, ${dateFormat(dataAnggotaById?.tgl_lahir_ibu)}`}
        />
        <ListDetail title="Alamat Ortu" value={dataAnggotaById?.alamat_ortu} />
        <ListDetail
          title="No Telp Ortu"
          value={dataAnggotaById?.no_telp_ortu}
        />

        {/* DETAIL PANGKALAN */}
        <div className="col-span-2 mt-5 flex flex-col items-center gap-2">
          <h1 className="text-gray-500">Data Tentang Pangkalan</h1>
          <div className=" h-0.5 w-full rounded-full bg-gray-200"></div>
        </div>
        <ListDetail
          title="Tgl masuk"
          value={dateFormat(dataAnggotaById?.tgl_masuk_pangkalan)}
        />
        <ListDetail
          title="Tingkat masuk"
          value={dataAnggotaById?.tingkat_masuk}
        />
        <ListDetail
          title="Tgl keluar"
          value={dateFormat(dataAnggotaById?.tgl_keluar_pangkalan)}
        />
        <ListDetail
          title="Alasan keluar"
          value={dataAnggotaById?.alasan_keluar}
        />
      </ModalDetail>
    </>
  );
};

export default TableAnggota;
