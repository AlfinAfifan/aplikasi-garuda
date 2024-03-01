const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const lembagaModel = require('./lembagaModel.js');

const adminModel = db.define(
  'admin',
  {
    nama: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    id_lembaga: DataTypes.INTEGER,
    nta: DataTypes.STRING,
    tmpt_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATEONLY,
    alamat: DataTypes.TEXT,
    agama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

adminModel.belongsTo(lembagaModel, { foreignKey: 'id_lembaga' });

module.exports = adminModel;

(async () => {
  await db.sync();
})();
