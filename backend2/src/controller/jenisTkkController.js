import { response } from 'express';
import jenisTkkModel from '../models/jenisTkkModel.js';
import usersModel from '../models/usersModel.js';

// CONTROLLER GET ALL SURAT

export const getJenisTkk = async (req, res) => {
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
export const getJenisTkkById = async (req, res) => {
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
export const createJenisTkk = async (req, res) => {
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
  const { nama, bidang, warna } = req.body;

  try {
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

// CONTROLLER UPDATdataK SURAT
export const updateJenisTkk = async (req, res) => {
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
  const { nama, bidang, warna } = req.body;

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
export const deleteJenisTkk = async (req, res) => {
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
