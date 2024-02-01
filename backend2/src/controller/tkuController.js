import { response } from 'express';
import moment from 'moment';
import tkuModel from '../models/tkuModel.js';
import anggotaModel from '../models/anggotaModel.js';
import lembagaModel from '../models/lembagaModel.js';
import usersModel from '../models/usersModel.js';

// CONTROLLER GET ALL SURAT

export const getTku = async (req, res) => {
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
    const response = await tkuModel.findAll({
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
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getRamu = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        ramu: true,
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
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getRakit = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        rakit: true,
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
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getTerap = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        terap: true,
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
      ],
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getTkuById = async (req, res) => {
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
    const response = await tkuModel.findOne({
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
      ],
    });

    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
export const createTku = async (req, res) => {
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
  const lastRecord = await tkuModel.findOne({
    order: [['no_sk', 'DESC']],
  });
  const nextId = lastRecord ? parseInt(lastRecord.no_sk, 10) + 1 : 1;
  const autoIncrementedValue = nextId.toString().padStart(3, '0').slice(-3); // Ambil 3 digit terakhir.

  // request body
  const { id_anggota } = req.body;
  const ramu = true;
  const tgl_ramu = moment();

  try {
    // Save data to database without file processing
    await tkuModel.create({
      id_anggota,
      ramu,
      tgl_ramu,
      no_sk: autoIncrementedValue,
    });
    res.status(201).json({ message: 'Create TKU Success' });
  } catch (error) {
    res.status(500).json({
      message: 'Create TKU Failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
export const updateTku = async (req, res) => {
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
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data not found',
    });

  // request new update
  const { id_anggota } = req.body;

  // save update to database
  try {
    await tkuModel.update(
      {
        id_anggota,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Update TKU Success' });
  } catch (error) {
    res.json({
      message: 'Update TKU Failed',
      error: error,
    });
  }
};

export const updateRakit = async (req, res) => {
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
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // Cek apakah sudah rakit
  if (dataUpdate.ramu === false)
    return res.status(400).json({
      message: 'Belum Selesai Ramu',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_ramu);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 100)
    return res.status(400).json({
      message: 'Jarak Minimal 100 Hari',
    });

  // request new update
  const { id_anggota } = req.body;
  const rakit = true;
  const tgl_rakit = dateNow;

  // save update to database
  try {
    await tkuModel.update(
      {
        id_anggota,
        rakit,
        tgl_rakit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Update Rakit Success' });
  } catch (error) {
    res.json({
      message: 'Update Rakit Failed',
      error: error,
    });
  }
};

export const updateTerap = async (req, res) => {
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
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // Cek apakah sudah rakit
  if (dataUpdate.rakit !== true)
    return res.status(400).json({
      message: 'Belum Selesai Rakit',
    });

  // Cek jarak update
  const lastUpdate = moment(dataUpdate.tgl_rakit);
  const dateNow = moment();
  const cek = dateNow.diff(lastUpdate, 'days');

  if (cek <= 100)
    return res.status(400).json({
      message: 'Jarak Minimal 100 Hari',
    });

  // request new update
  const { id_anggota } = req.body;
  const terap = true;
  const tgl_terap = dateNow;

  // save update to database
  try {
    await tkuModel.update(
      {
        id_anggota,
        terap,
        tgl_terap,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Update Terap Success' });
  } catch (error) {
    res.json({
      message: 'Update Terap Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deleteRamu = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataDelete = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataDelete) return res.status(404).json({ message: 'Data Not Found' });

  // if there is data
  try {
    await tkuModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Delete Data Ramu Success' });
  } catch (error) {
    res.json({
      message: 'Delete Data Ramu Failed',
      Error: error,
    });
  }
};

export const deleteRakit = async (req, res) => {
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
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const rakit = false;
  const tgl_rakit = null;

  // save update to database
  try {
    await tkuModel.update(
      {
        rakit,
        tgl_rakit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Delete Rakit Success' });
  } catch (error) {
    res.json({
      message: 'Delete Rakit Failed',
      error: error,
    });
  }
};

export const deleteTerap = async (req, res) => {
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
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataUpdate)
    return res.status(404).json({
      message: 'Data Not Found',
    });

  // request new update
  const terap = false;
  const tgl_terap = null;

  // save update to database
  try {
    await tkuModel.update(
      {
        terap,
        tgl_terap,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Delete Terap Success' });
  } catch (error) {
    res.json({
      message: 'Delete Terap Failed',
      error: error,
    });
  }
};
