const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const anggotaModel = require('./anggotaModel.js');

const tkuModel = db.define(
  'tku',
  {
    no_sk: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_anggota: DataTypes.INTEGER,
    ramu: DataTypes.BOOLEAN,
    rakit: DataTypes.BOOLEAN,
    terap: DataTypes.BOOLEAN,
    tgl_ramu: DataTypes.DATEONLY,
    tgl_rakit: DataTypes.DATEONLY,
    tgl_terap: DataTypes.DATEONLY,
  },
  {
    freezeTableName: true,
  }
);

tkuModel.belongsTo(anggotaModel, { foreignKey: 'id_anggota', as: 'anggota' });

module.exports = tkuModel;

(async () => {
  await db.sync();
})();
