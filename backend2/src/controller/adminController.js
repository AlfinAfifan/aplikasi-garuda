import { response } from 'express';
import adminModel from '../models/adminModel.js';
import lembagaModel from '../models/lembagaModel.js';

// CONTROLLER GET ALL SURAT

export const getAdmin = async (req, res) => {
  try {
    const response = await adminModel.findAll({
      include: [
        {
          model: lembagaModel,
          attributes: ['nama_lembaga'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getAdminById = async (req, res) => {
  try {
    const response = await adminModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: lembagaModel,
          attributes: ['nama_lembaga'],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
export const createAdmin = async (req, res) => {
  // request body
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan } = req.body;

  try {
    // Save data to database without file processing
    await adminModel.create({
      nama,
      id_lembaga,
      nta,
      tmpt_lahir,
      tgl_lahir,
      alamat,
      agama,
    });
    res.status(201).json({ message: 'creating admin success' });
  } catch (error) {
    res.status(500).json({
      message: 'creating admin failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
export const updateAdmin = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await adminModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // request new update
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan } = req.body;

  // save update to database
  try {
    await adminModel.update(
      {
        nama,
        id_lembaga,
        nta,
        tmpt_lahir,
        tgl_lahir,
        alamat,
        agama,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'updated admin successfully' });
  } catch (error) {
    res.json({
      message: 'update admin failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deleteAdmin = async (req, res) => {
  const dataDelete = await adminModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    await adminModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'deleted admin success' });
  } catch (error) {
    res.json({
      message: 'delete admin failed',
      Error: error,
    });
  }
};
