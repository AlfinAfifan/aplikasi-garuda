const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const anggotaModel = require('./anggotaModel.js');

const jenisTkkModel = db.define(
  'jenis_tkk',
  {
    nama: DataTypes.STRING,
    bidang: DataTypes.STRING,
    warna: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = jenisTkkModel;

(async () => {
  await db.sync();
})();
