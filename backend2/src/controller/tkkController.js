import { response } from 'express';
import moment from 'moment';
import tkkModel from '../models/tkkModel.js';
import anggotaModel from '../models/anggotaModel.js';
import jenisTkkModel from '../models/jenisTkkModel.js';

// CONTROLLER GET ALL SURAT
export const getTkk = async (req, res) => {
  try {
    const response = await tkkModel.findAll({
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
        },
        {
          model: jenisTkkModel,
          as: 'jenis_tkk',
          attributes: ['nama', 'bidang', 'warna'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getPurwa = async (req, res) => {
  try {
    const response = await tkkModel.findAll({
      where: {
        purwa: true,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
        },
        {
          model: jenisTkkModel,
          as: 'jenis_tkk',
          attributes: ['nama', 'bidang', 'warna'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getMadya = async (req, res) => {
  try {
    const response = await tkkModel.findAll({
      where: {
        madya: true,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
        },
        {
          model: jenisTkkModel,
          as: 'jenis_tkk',
          attributes: ['nama', 'bidang', 'warna'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};
export const getUtama = async (req, res) => {
  try {
    const response = await tkkModel.findAll({
      where: {
        utama: true,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
        },
        {
          model: jenisTkkModel,
          as: 'jenis_tkk',
          attributes: ['nama', 'bidang', 'warna'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getTkkById = async (req, res) => {
  try {
    const response = await tkkModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
        },
        {
          model: jenisTkkModel,
          as: 'jenis_tkk',
          attributes: ['nama', 'bidang', 'warna'],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
export const createPurwa = async (req, res) => {
  // request body
  const { no_sk, id_anggota, id_jenis_tkk, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const purwa = true;
  const tgl_purwa = moment();

  try {
    // Save data to database without file processing
    await tkkModel.create({
      no_sk,
      id_anggota,
      id_jenis_tkk,
      purwa,
      tgl_purwa,
      nama_penguji,
      jabatan_penguji,
      alamat_penguji,
    });
    res.status(201).json({ message: 'creating tkk purwa success' });
  } catch (error) {
    res.status(500).json({
      message: 'creating tkk purwa failed',
      error: error,
    });
  }
};

export const createMadya = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // Cek apakah sudah purwa
  if (dataUpdate.purwa !== true)
    return res.status(400).json({
      message: 'belum selesai purwa',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_purwa);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 100)
    return res.status(400).json({
      message: 'jarak minimal 100 hari',
    });

  // request new update
  const { no_sk, id_anggota, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const madya = true;
  const tgl_madya = moment();

  // save update to database
  try {
    await tkkModel.update(
      {
        no_sk,
        id_anggota,
        madya,
        tgl_madya,
        nama_penguji,
        jabatan_penguji,
        alamat_penguji,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'create tkk madya successfully' });
  } catch (error) {
    res.json({
      message: 'create tkk madya failed',
      error: error,
    });
  }
};

export const createUtama = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // Cek apakah sudah rakit
  if (dataUpdate.madya !== true)
    return res.status(400).json({
      message: 'belum selesai madya',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_madya);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 100)
    return res.status(400).json({
      message: 'jarak minimal 100 hari',
    });

  // request new update
  const { no_sk, id_anggota, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const utama = true;
  const tgl_utama = moment();

  // save update to database
  try {
    await tkkModel.update(
      {
        no_sk,
        id_anggota,
        utama,
        tgl_utama,
        nama_penguji,
        jabatan_penguji,
        alamat_penguji,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'create tkk utama successfully' });
  } catch (error) {
    res.json({
      message: 'create tkk utama failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
export const updateTkk = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // request new update
  const { no_sk, id_anggota, id_jenis_tkk, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;

  // save update to database
  try {
    await tkkModel.update(
      {
        no_sk,
        id_anggota,
        id_jenis_tkk,
        nama_penguji,
        jabatan_penguji,
        alamat_penguji,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'updated tkk successfully' });
  } catch (error) {
    res.json({
      message: 'updated tkk failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deletePurwa = async (req, res) => {
  const dataDelete = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    await tkkModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'deleted tkk purwa success' });
  } catch (error) {
    res.json({
      message: 'delete tkk purwa failed',
      Error: error,
    });
  }
};

export const deleteMadya = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  const madya = false;
  const tgl_madya = null;

  // save update to database
  try {
    await tkkModel.update(
      {
        madya,
        tgl_madya,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'delete tkk madya successfully' });
  } catch (error) {
    res.json({
      message: 'delete tkk madya failed',
      error: error,
    });
  }
};

export const deleteUtama = async (req, res) => {
  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'No Data Found',
    });

  const utama = false;
  const tgl_utama = null;

  // save update to database
  try {
    await tkkModel.update(
      {
        utama,
        tgl_utama,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'delete tkk utama successfully' });
  } catch (error) {
    res.json({
      message: 'delete tkk utama failed',
      error: error,
    });
  }
};
