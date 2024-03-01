const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const anggotaModel = require('./anggotaModel.js');
const jenisTkkModel = require('./jenisTkkModel.js');

const tkkModel = db.define(
  'tkk',
  {
    no_sk: DataTypes.STRING,
    id_anggota: DataTypes.INTEGER,
    id_jenis_tkk: DataTypes.INTEGER,
    purwa: DataTypes.BOOLEAN,
    madya: DataTypes.BOOLEAN,
    utama: DataTypes.BOOLEAN,
    tgl_purwa: DataTypes.DATEONLY,
    tgl_madya: DataTypes.DATEONLY,
    tgl_utama: DataTypes.DATEONLY,
    nama_penguji: DataTypes.STRING,
    jabatan_penguji: DataTypes.STRING,
    alamat_penguji: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

tkkModel.belongsTo(anggotaModel, { foreignKey: 'id_anggota', as: 'anggota' });
tkkModel.belongsTo(jenisTkkModel, { foreignKey: 'id_jenis_tkk', as: 'jenis_tkk' });

module.exports = tkkModel;

(async () => {
  await db.sync();
})();
