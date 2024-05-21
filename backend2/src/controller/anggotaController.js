const { response } = require('express');
const lembagaModel = require('../models/lembagaModel.js');
const anggotaModel = require('../models/anggotaModel.js');
const usersModel = require('../models/usersModel.js');

// CONTROLLER GET ALL SURAT

exports.getAnggota = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  let whereClause = {};
  if (user[0].id_lembaga !== null) {
    whereClause = {
      id_lembaga: user[0].id_lembaga,
    };
  }
  try {
    const response = await anggotaModel.findAll({
      where: whereClause,
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
exports.getAnggotaById = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  let whereClause = {};
  if (user[0].id_lembaga !== null) {
    whereClause = {
      id: req.params.id,
      id_lembaga: user[0].id_lembaga,
    };
  } else {
    whereClause = {
      id: req.params.id,
    };
  }
  try {
    const response = await anggotaModel.findOne({
      where: whereClause,
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
exports.createAnggota = async (req, res) => {
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
  const {
    nama,
    id_lembaga,
    no_induk,
    nta,
    tmpt_lahir,
    tgl_lahir,
    gender,
    agama,
    warga,
    rt,
    rw,
    ds_kelurahan,
    kecamatan,
    kab_kota,
    provinsi,
    map,
    no_telp,
    bakat_hobi,
    nama_ayah,
    tmpt_lahir_ayah,
    tgl_lahir_ayah,
    nama_ibu,
    tmpt_lahir_ibu,
    tgl_lahir_ibu,
    alamat_ortu,
    no_telp_ortu,
    tgl_masuk_pangkalan,
    tingkat_masuk,
    tgl_keluar_pangkalan,
    alasan_keluar,
  } = req.body;

  try {
    // Save data to database without file processing
    await anggotaModel.create({
      nama,
      id_lembaga,
      no_induk,
      nta,
      tmpt_lahir,
      tgl_lahir,
      gender,
      agama,
      warga,
      rt,
      rw,
      ds_kelurahan,
      kecamatan,
      kab_kota,
      provinsi,
      map,
      no_telp,
      bakat_hobi,
      nama_ayah,
      tmpt_lahir_ayah,
      tgl_lahir_ayah,
      nama_ibu,
      tmpt_lahir_ibu,
      tgl_lahir_ibu,
      alamat_ortu,
      no_telp_ortu,
      tgl_masuk_pangkalan,
      tingkat_masuk,
      tgl_keluar_pangkalan,
      alasan_keluar,
    });
    res.status(201).json({ message: 'Creating Anggota Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Creating Anggota Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATE SURAT
exports.updateAnggota = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  let whereClause = {};
  if (user[0].id_lembaga !== null) {
    whereClause = {
      id: req.params.id,
      id_lembaga: user[0].id_lembaga,
    };
  } else {
    whereClause = {
      id: req.params.id,
    };
  }
  // cek if there is data by id
  const dataUpdate = await anggotaModel.findOne({
    where: whereClause,
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const {
    nama,
    id_lembaga,
    no_induk,
    nta,
    tmpt_lahir,
    tgl_lahir,
    gender,
    agama,
    warga,
    rt,
    rw,
    ds_kelurahan,
    kecamatan,
    kab_kota,
    provinsi,
    map,
    no_telp,
    bakat_hobi,
    nama_ayah,
    tmpt_lahir_ayah,
    tgl_lahir_ayah,
    nama_ibu,
    tmpt_lahir_ibu,
    tgl_lahir_ibu,
    alamat_ortu,
    no_telp_ortu,
    tgl_masuk_pangkalan,
    tingkat_masuk,
    tgl_keluar_pangkalan,
    alasan_keluar,
  } = req.body;

  // save update to database
  try {
    await anggotaModel.update(
      {
        nama,
        id_lembaga,
        no_induk,
        nta,
        tmpt_lahir,
        tgl_lahir,
        gender,
        agama,
        warga,
        rt,
        rw,
        ds_kelurahan,
        kecamatan,
        kab_kota,
        provinsi,
        map,
        no_telp,
        bakat_hobi,
        nama_ayah,
        tmpt_lahir_ayah,
        tgl_lahir_ayah,
        nama_ibu,
        tmpt_lahir_ibu,
        tgl_lahir_ibu,
        alamat_ortu,
        no_telp_ortu,
        tgl_masuk_pangkalan,
        tingkat_masuk,
        tgl_keluar_pangkalan,
        alasan_keluar,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Update Anggota Successfully' });
  } catch (error) {
    res.json({
      message: 'Update Anggota Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteAnggota = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  let whereClause = {};
  if (user[0].id_lembaga !== null) {
    whereClause = {
      id: req.params.id,
      id_lembaga: user[0].id_lembaga,
    };
  } else {
    whereClause = {
      id: req.params.id,
    };
  }
  const dataDelete = await anggotaModel.findOne({
    where: whereClause
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await anggotaModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Delete Anggota Success' });
  } catch (error) {
    if (error.original.errno === 1451) {
      res.status(500).json({
        message: 'Data masih tertaut pada tabel TKU / TKK',
        error: error,
      });
    } else {
      res.status(500).json({
        message: 'Delete Anggota Failed',
        error: error,
      });
    }
  }
};
