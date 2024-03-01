const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

const lembagaModel = db.define(
  'lembaga',
  { 
    nama_lembaga: DataTypes.STRING, 
    alamat: DataTypes.TEXT, 
    no_gudep_lk: DataTypes.STRING, 
    no_gudep_pr: DataTypes.STRING, 
    kepsek: DataTypes.STRING, 
    nip_kepsek: DataTypes.STRING 
  },
  {
    freezeTableName: true,
  }
);

module.exports = lembagaModel;

(async () => {
  await db.sync();
})();
