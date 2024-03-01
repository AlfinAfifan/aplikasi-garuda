const { response } = require('express');
const moment = require('moment');
const tkkModel = require('../models/tkkModel.js');
const anggotaModel = require('../models/anggotaModel.js');
const jenisTkkModel = require('../models/jenisTkkModel.js');
const usersModel = require('../models/usersModel.js');
const lembagaModel = require('../models/lembagaModel.js');

// CONTROLLER GET ALL SURAT
exports.getTkk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    const response = await tkkModel.findAll({
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          attributes: ['nama'],
          include: [
            {
              model: lembagaModel,
              attributes: ['nama_lembaga'],
            },
          ],
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

exports.getPurwa = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
          include: [
            {
              model: lembagaModel,
              attributes: ['nama_lembaga'],
            },
          ],
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

exports.getMadya = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
          include: [
            {
              model: lembagaModel,
              attributes: ['nama_lembaga'],
            },
          ],
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

exports.getUtama = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
          include: [
            {
              model: lembagaModel,
              attributes: ['nama_lembaga'],
            },
          ],
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
exports.getTkkById = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
          include: [
            {
              model: lembagaModel,
              attributes: ['nama_lembaga'],
            },
          ],
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
exports.createPurwa = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // AUTO INCREMENT NO SK
  const lastRecord = await tkkModel.findOne({
    order: [['no_sk', 'DESC']],
  });
  const nextId = lastRecord ? parseInt(lastRecord.no_sk, 10) + 1 : 1;
  const autoIncrementedValue = nextId.toString().padStart(3, '0').slice(-3); // Ambil 3 digit terakhir.

  // request body
  const { id_anggota, id_jenis_tkk, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const purwa = true;
  const tgl_purwa = moment();

  try {
    // Save data to database without file processing
    await tkkModel.create({
      id_anggota,
      id_jenis_tkk,
      purwa,
      tgl_purwa,
      nama_penguji,
      jabatan_penguji,
      alamat_penguji,
      no_sk: autoIncrementedValue,
    });
    res.status(201).json({ message: 'Create TKK Purwa Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Create TKK Purwa Failed',
      error: error,
    });
  }
};

exports.createMadya = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data not found',
    });

  // Cek apakah sudah purwa
  if (dataUpdate.purwa !== true)
    return res.status(400).json({
      message: 'Belum Selesai Purwa',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_purwa);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 30)
    return res.status(400).json({
      message: 'Jarak Minimal 100 Hari',
    });

  // request new update
  const { id_anggota, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const madya = true;
  const tgl_madya = moment();

  // save update to database
  try {
    await tkkModel.update(
      {
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
    res.status(200).json({ message: 'Create TKK Madya Success' });
  } catch (error) {
    res.json({
      message: 'Create TKK Madya Failed',
      error: error,
    });
  }
};

exports.createUtama = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // Cek apakah sudah rakit
  if (dataUpdate.madya !== true)
    return res.status(400).json({
      message: 'Belum Selesai Madya',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_madya);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 30)
    return res.status(400).json({
      message: 'Jarak Minimal 100 Hari',
    });

  // request new update
  const { id_anggota, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;
  const utama = true;
  const tgl_utama = moment();

  // save update to database
  try {
    await tkkModel.update(
      {
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
    res.status(200).json({ message: 'Create TKK Utama Success' });
  } catch (error) {
    res.json({
      message: 'Create TKK Utama Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
exports.updateTkk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const { id_anggota, id_jenis_tkk, nama_penguji, jabatan_penguji, alamat_penguji } = req.body;

  // save update to database
  try {
    await tkkModel.update(
      {
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
    res.status(200).json({ message: 'Update TKK Success' });
  } catch (error) {
    res.json({
      message: 'Update TKK Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deletePurwa = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await tkkModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Delete TKK Purwa Success' });
  } catch (error) {
    res.json({
      message: 'Delete TKK Purwa Failed',
      Error: error,
    });
  }
};

exports.deleteMadya = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
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
    res.status(200).json({ message: 'Delete TKK Madya Success' });
  } catch (error) {
    res.json({
      message: 'Delete TKK Madya Failed',
      error: error,
    });
  }
};

exports.deleteUtama = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await tkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
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
    res.status(200).json({ message: 'Delete TKK Utama Success' });
  } catch (error) {
    res.json({
      message: 'Delete TKK Utama Failed',
      error: error,
    });
  }
};
