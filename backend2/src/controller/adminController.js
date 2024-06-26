const { response } = require('express');
const adminModel = require('../models/adminModel.js');
const lembagaModel = require('../models/lembagaModel.js');
const usersModel = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

// CONTROLLER GET ALL SURAT

exports.getAdmin = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      id_lembaga: null
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
exports.getAdminById = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      id_lembaga: null
    },
  });
  if (!user[0]) return res.sendStatus(403);

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
exports.createAdmin = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      id_lembaga: null
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // request body
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan, email } = req.body;

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
      jabatan,
      email,
    });

    // CREATE NEW USER
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(email, salt);
    await usersModel.create({
      name: nama,
      email: email,
      password: hashPassword,
      id_lembaga,
    });

    res.status(201).json({ message: 'Creating Admin Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Creating Admin Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATE SURAT
exports.updateAdmin = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      id_lembaga: null
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await adminModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // CEK EMAIL USER
  let dataEmail = '';
  if (dataUpdate?.email) {
    dataEmail = dataUpdate.email;
  }

  const dataUser = await usersModel.findOne({
    where: {
      email: dataEmail,
    },
  });

  if (!dataUpdate || !dataUser)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan, email } = req.body;

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
        jabatan,
        email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // UPDATE USER
    await usersModel.update(
      {
        name: nama,
        email,
      },
      {
        where: {
          email: dataEmail,
        },
      }
    );

    res.status(200).json({ message: 'Updated Admin success' });
  } catch (error) {
    res.json({
      message: 'Update Admin Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteAdmin = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      id_lembaga: null
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await adminModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await adminModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    await usersModel.destroy({
      where: {
        name: dataDelete.nama,
        email: dataDelete.email
      }
    })
    res.status(200).json({ message: 'Deleted Admin Success' });
  } catch (error) {
    res.json({
      message: 'Delete Admin Failed',
      Error: error,
    });
  }
  
};
