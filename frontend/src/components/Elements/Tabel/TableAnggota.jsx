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
import { getAnggota } from "../../../redux/actions/anggota/anggotaThunk";
import { dateFormat } from "../DataFormat/DateFormat";

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
    formRef.current.reset();
    document.body.style.overflow = "auto";
  };

  const handleOption = () => {
    console.log("Option");
  };

  // GET DATA
  const dispatch = useDispatch();
  const dataAnggota = useSelector((i) => i.anggota.data);

  useEffect(() => {
    dispatch(getAnggota());
  }, []);

  const klik = () => {
    dispatch(getAnggota());
  };

  return (
    <>
      <ShowDataLayout
        title="Tabel Data Anggota"
        clickAdd={openModal}
        clickOption={handleOption}
      >
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
          {dataAnggota?.map((data, idx) => (
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
                <TrashIcon
                  className="hover w-6 cursor-pointer text-red-600 hover:text-red-700"
                  onClick={klik}
                />
                <PencilSquareIcon className="w-6 cursor-pointer text-third hover:text-first" />
                <DocumentTextIcon className="w-6 cursor-pointer text-amber-500 hover:text-amber-600" />
              </td>
            </tr>
          ))}
        </TBody>
      </ShowDataLayout>

      {/* MODAL INPUT */}
      <Modal
        title="Tambah Data Anggota"
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClick={closeModal}
      >
        <form
          action="#"
          ref={formRef}
          className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 pb-10"
        >
          <Input
            label="Nama"
            name="nama"
            type="text"
            onchange={(e) => console.log(e.target.value)}
          />
          <Input label="Asal Lembaga" name="lembaga" type="text" />
          <Input label="Nomor Induk" name="noInduk" type="number" />
          <Input label="NTA" name="nta" type="number" />
          <Input label="Tempat Lahir" name="tmpLahir" type="text" />
          <Input label="Tanggal Lahir" name="tglLahir" type="date" />
          <SelectOpt label="Jenis Kelamin" name="jk">
            <option value="pilih" disabled hidden>
              Pilih jenis kelamin
            </option>
            <option value="">Laki - Laki</option>
            <option value="">Perempuan</option>
          </SelectOpt>
          <SelectOpt label="Agama" name="agama">
            <option value="pilih" disabled hidden>
              Pilih agama
            </option>
            <option value="">Islam</option>
            <option value="">Katholik</option>
          </SelectOpt>
          <SelectOpt label="Kewarganegaraan" name="kewarganegaraan">
            <option value="pilih" disabled hidden>
              Pilih kewarganegaraan
            </option>
            <option value="">WNI (Warga Negara Indonesia)</option>
            <option value="">WNA (Warga Negara Asing)</option>
          </SelectOpt>
          <div className="grid grid-cols-2 gap-4">
            <Input label="RT" name="rt" type="number" />
            <Input label="RW" name="rw" type="number" />
          </div>
          <Input label="Desa / Kelurahan" name="desa" type="text" />
          <Input label="Kecamatan" name="kecamatan" type="text" />
          <Input label="Kabupaten / Kota" name="kab" type="text" />
          <Input label="Provinsi" name="prov" type="text" />
          <Input label="Map" name="map" type="text" />
          <Input label="No Telepon" name="telp" type="number" />
          <Input label="Bakat / Hobi" name="bakat" type="text" />
          <Input label="Nama Ayah" name="ayah" type="text" />
          <Input label="Tempat Lahir Ayah" name="tmptayah" type="text" />
          <Input label="Tanggal Lahir Ayah" name="tglayah" type="date" />
          <Input label="Nama Ibu" name="ibu" type="text" />
          <Input label="Tempat Lahir Ibu" name="tmptibu" type="text" />
          <Input label="Tanggal Lahir Ibu" name="tglibu" type="date" />
          <Input label="Alamat Orang Tua" name="alamatOrtu" type="text" />
          <Input label="No Telepon Orang Tua" name="telpOrtu" type="number" />
          <Input label="Tanggal Masuk Pangkalan" name="tglMasuk" type="date" />
          <Input
            label="Tingkat Masuk Pangkalan"
            name="tingkatMasuk"
            type="text"
          />
          <Input
            label="Tanggal Keluar Pangkalan"
            name="tglKeluar"
            type="date"
          />
          <Input
            label="Alasan Keluar Pangkalan"
            name="alasanKeluar"
            type="text"
          />

          <Button>Simpan</Button>
        </form>
      </Modal>
    </>
  );
};

export default TableAnggota;
