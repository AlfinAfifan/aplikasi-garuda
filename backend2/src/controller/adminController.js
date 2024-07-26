const { response } = require('express');
const lembagaModel = require('../models/lembagaModel.js');
const usersModel = require('../models/usersModel.js');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// CONTROLLER GET ALL SURAT

exports.getAdmin = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
      role: 'super_admin',
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    const response = await usersModel.findAll({
      where: {
        id_lembaga: {
          [Op.ne]: null,
        },
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
      role: {
        [Op.in]: ['super_admin', 'admin'],
      },
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    const response = await usersModel.findOne({
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
      role: 'super_admin',
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // request body
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan, email, password } = req.body;

  try {
    // Save data to database without file processing
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await usersModel.create({
      nama,
      id_lembaga,
      nta,
      tmpt_lahir,
      tgl_lahir,
      alamat,
      agama,
      jabatan,
      email,
      password: hashPassword,
      role: 'admin',
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
      role: {
        [Op.in]: ['super_admin', 'admin'],
      },
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const dataUpdate = await usersModel.findOne({
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
  const { nama, id_lembaga, nta, tmpt_lahir, tgl_lahir, alamat, agama, jabatan, email, password } = req.body;
  const { namaUser, tmpt_lahirUser, tgl_lahirUser, alamatUser, agamaUser, emailUser, passwordUser } = req.body;

  const salt = await bcrypt.genSalt();
  let thisPassword
  if (passwordUser && passwordUser !== dataUpdate.password) {
    thisPassword = await bcrypt.hash(passwordUser, salt)
  }
  if (password && password !== dataUpdate.password) {
    thisPassword = await bcrypt.hash(password, salt)
  }

  // save update to database
  try {
    await usersModel.update(
      {
        nama: nama ? nama : namaUser,
        tmpt_lahir: tmpt_lahir ? tmpt_lahir : tmpt_lahirUser,
        tgl_lahir: tgl_lahir ? tgl_lahir : tgl_lahirUser,
        alamat: alamat ? alamat : alamatUser,
        agama: agama ? agama : agamaUser,
        email: email ? email : emailUser,
        password: thisPassword,
        id_lembaga,
        nta,
        jabatan,
      },
      {
        where: {
          id: req.params.id,
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
      role: 'super_admin',
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await usersModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await usersModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: 'Deleted Admin Success' });
  } catch (error) {
    res.json({
      message: 'Delete Admin Failed',
      Error: error,
    });
  }
};
