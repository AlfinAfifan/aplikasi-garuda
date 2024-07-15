const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const lembagaModel = require('./lembagaModel.js');

const usersModel = db.define(
  'users',
  {
    nama: DataTypes.STRING,
    id_lembaga: DataTypes.INTEGER,
    role: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    nta: DataTypes.STRING,
    tmpt_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATEONLY,
    alamat: DataTypes.TEXT,
    agama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
  },
  { 
    freezeTableName: true,
  }
);

usersModel.belongsTo(lembagaModel, { foreignKey: 'id_lembaga' });

module.exports = usersModel;

(async () => {
  await db.sync();
})();
