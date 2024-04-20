const { response } = require('express');
const jenisTkkModel = require('../models/jenisTkkModel.js');
const usersModel = require('../models/usersModel.js');

// CONTROLLER GET ALL SURAT

exports.getJenisTkk = async (req, res) => {
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
    const response = await jenisTkkModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
exports.getJenisTkkById = async (req, res) => {
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
    const response = await jenisTkkModel.findOne({
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
exports.createJenisTkk = async (req, res) => {
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
  const { nama, bidang } = req.body;

  let warna = '';
  if (bidang === 'agama' || bidang === 'moral' || bidang === 'pembentukan pribadi dan watak') {
    warna = 'kuning';
  } else if (bidang === 'kesehatan' || bidang === 'ketangkasan') {
    warna = 'putih';
  } else if (bidang === 'sosial' || bidang === 'perikemanusiaan' || bidang === 'ketertiban masyarakat' || bidang === 'gotong royong') {
    warna = 'biru';
  } else if (bidang === 'patriotisme' || bidang === 'seni budaya') {
    warna = 'merah';
  } else if (bidang === 'keterampilan' || bidang === 'teknik pembangunan') {
    warna = 'hijau';
  }

  try {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', warna);
    // Save data to database without file processing
    await jenisTkkModel.create({
      nama,
      bidang,
      warna,
    });
    res.status(201).json({ message: 'Creating Jenis TKK Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Creating Jenis TKK Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATE SURAT
exports.updateJenisTkk = async (req, res) => {
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
  const dataUpdate = await jenisTkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const { nama, bidang } = req.body;
  let warna = '';
  if (bidang === 'agama' || bidang === 'moral' || bidang === 'pembentukan pribadi dan watak') {
    warna = 'kuning';
  } else if (bidang === 'kesehatan' || bidang === 'ketangkasan') {
    warna = 'putih';
  } else if (bidang === 'sosial' || bidang === 'perikemanusiaan' || bidang === 'ketertiban masyarakat' || bidang === 'gotong royong') {
    warna = 'biru';
  } else if (bidang === 'patriotisme' || bidang === 'seni budaya') {
    warna = 'merah';
  } else if (bidang === 'keterampilan' || bidang === 'teknik pembangunan') {
    warna = 'hijau';
  }

  // save update to database
  try {
    await jenisTkkModel.update(
      {
        nama,
        bidang,
        warna,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Updated Jenis TKK Success' });
  } catch (error) {
    res.json({
      message: 'Updated Jenis TKK Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteJenisTkk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await jenisTkkModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await jenisTkkModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Delete Jenis TKK Success' });
  } catch (error) {
    res.json({
      message: 'Delete Jenis TKK Failed',
      Error: error,
    });
  }
};
