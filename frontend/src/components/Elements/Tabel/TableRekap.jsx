import React, { useState } from "react";
import ShowDataLayout from "../../Layouts/ShowDataLayout";
import { TBody, THead } from "../../Layouts/TableLayout";
import Modal from "../Modal/ModalInput";
import Input from "../Form/Input";
import Button from "../Form/Button";

const TableRekap = () => {
  return (
    <>
      <ShowDataLayout title="Tabel Rekap Data">
        <THead>
          <tr>
            <td>No</td>
            <td>Nama</td>
            <td>NTA</td>
            <td>Tanggal Ramu</td>
            <td>Tanggal Rakit</td>
            <td>Tanggal Terap</td>
            <td>Jumlah Purwa</td>
            <td>Jumlah Madya</td>
            <td>Jumlah Utama</td>
          </tr>
        </THead>
        <TBody>
          <tr className="capitalize">
            <td className="font-bold">1</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
            <td>Aman</td>
          </tr>
        </TBody>
      </ShowDataLayout>
    </>
  );
};

export default TableRekap;
