const { response } = require('express');
const moment = require('moment');
const tkuModel = require('../models/tkuModel.js');
const anggotaModel = require('../models/anggotaModel.js');
const lembagaModel = require('../models/lembagaModel.js');
const usersModel = require('../models/usersModel.js');
const { Sequelize, Op, where } = require('sequelize');
const db = require('../config/database.js');

// CONTROLLER GET ALL SURAT

exports.getTku = async (req, res) => {
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
    const response = await tkuModel.findAll({
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getRamu = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        ramu: true,
        rakit: {
          [Sequelize.Op.not]: true,
        },
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getRamuByYear = async (req, res) => {
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

  const year = req.params.year;
  try {
    const response = await tkuModel.findAll({
      where: {
        ramu: true,
        rakit: {
          [Sequelize.Op.not]: true,
        },
        tgl_ramu: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getRakit = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        rakit: true,
        terap: {
          [Sequelize.Op.not]: true,
        },
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getRakitByYear = async (req, res) => {
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

  const year = req.params.year;
  try {
    const response = await tkuModel.findAll({
      where: {
        rakit: true,
        terap: {
          [Sequelize.Op.not]: true,
        },
        tgl_rakit: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getTerap = async (req, res) => {
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
    const response = await tkuModel.findAll({
      where: {
        terap: true,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

exports.getTerapByYear = async (req, res) => {
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

  const year = req.params.year;
  try {
    const response = await tkuModel.findAll({
      where: {
        terap: true,
        tgl_terap: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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
exports.getTkuById = async (req, res) => {
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
    const response = await tkuModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: anggotaModel,
          as: 'anggota',
          where: whereClause,
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

// GET TAHUN
exports.getYearRamu = async (req, res) => {
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
    const [results, metadata] = await db.query('SELECT DISTINCT YEAR(tgl_ramu) as year FROM tku WHERE tgl_ramu IS NOT NULL ORDER BY year');
    let years = results.map((row) => row.year);
    const currentYear = new Date().getFullYear();
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }
    years.sort((a, b) => a - b);

    res.json(years);
  } catch (error) {
    console.error('Error fetching years:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getYearRakit = async (req, res) => {
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
    const [results, metadata] = await db.query('SELECT DISTINCT YEAR(tgl_rakit) as year FROM tku WHERE tgl_rakit IS NOT NULL ORDER BY year');
    let years = results.map((row) => row.year);
    const currentYear = new Date().getFullYear();
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }
    years.sort((a, b) => a - b);

    res.json(years);
  } catch (error) {
    console.error('Error fetching years:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getYearTerap = async (req, res) => {
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
    const [results, metadata] = await db.query('SELECT DISTINCT YEAR(tgl_terap) as year FROM tku WHERE tgl_terap IS NOT NULL ORDER BY year');
    let years = results.map((row) => row.year);
    const currentYear = new Date().getFullYear();
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }
    years.sort((a, b) => a - b);

    res.json(years);
  } catch (error) {
    console.error('Error fetching years:', error);
    res.status(500).send('Internal Server Error');
  }
};

// CONTROLLER CREATE SURAT
exports.createTku = async (req, res) => {
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
exports.updateTku = async (req, res) => {
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
  // cek if there is data by id
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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

exports.updateRakit = async (req, res) => {
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
  // cek if there is data by id
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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
  const rakit = true;
  const tgl_rakit = dateNow;

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
    res.status(200).json({ message: 'Update Rakit Success' });
  } catch (error) {
    res.json({
      message: 'Update Rakit Failed',
      error: error,
    });
  }
};

exports.updateTerap = async (req, res) => {
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
  // cek if there is data by id
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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
  const terap = true;
  const tgl_terap = dateNow;

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
    res.status(200).json({ message: 'Update Terap Success' });
  } catch (error) {
    res.json({
      message: 'Update Terap Failed',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteRamu = async (req, res) => {
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
  const dataDelete = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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

exports.deleteRakit = async (req, res) => {
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
  // cek if there is data by id
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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

exports.deleteTerap = async (req, res) => {
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
  // cek if there is data by id
  const dataUpdate = await tkuModel.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: anggotaModel,
        as: 'anggota',
        where: whereClause
      }
    ]
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
