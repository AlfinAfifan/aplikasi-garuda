const { response } = require('express');
const lembagaModel = require('../models/lembagaModel.js');
const usersModel = require('../models/usersModel.js');

// CONTROLLER GET ALL SURAT

exports.getLembaga = async (req, res) => {
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
    const response = await lembagaModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
exports.getLembagaById = async (req, res) => {
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
    const response = await lembagaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
exports.createLembaga = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // request body
  const { nama_lembaga, alamat, no_gudep_lk, no_gudep_pr, kepsek, nip_kepsek } = req.body;

  try {
    // Save data to database without file processing
    await lembagaModel.create({
      nama_lembaga,
      alamat,
      no_gudep_lk,
      no_gudep_pr,
      kepsek,
      nip_kepsek,
    });
    res.status(201).json({ message: 'Creating Lembaga Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Creating Lembaga Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATE SURAT
exports.updateLembaga = async (req, res) => {
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
  const dataUpdate = await lembagaModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const { nama_lembaga, alamat, no_gudep_lk, no_gudep_pr, kepsek, nip_kepsek } = req.body;

  // save update to database
  try {
    await lembagaModel.update(
      {
        nama_lembaga,
        alamat,
        no_gudep_lk,
        no_gudep_pr,
        kepsek,
        nip_kepsek,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Update Lembaga Success' });
  } catch (error) {
    res.json({
      message: 'Update Lembaga Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteLembaga = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await lembagaModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await lembagaModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Delete Lembaga Success' });
  } catch (error) {
    res.status(500).json({
      message: error,
      error: error,
    });
  }
};
