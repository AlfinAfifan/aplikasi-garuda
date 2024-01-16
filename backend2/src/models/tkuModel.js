import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import anggotaModel from './anggotaModel.js';

const { DataTypes } = Sequelize;

const tkuModel = db.define(
  'tku',
  { no_sk: DataTypes.STRING, id_anggota: DataTypes.INTEGER, ramu: DataTypes.BOOLEAN, rakit: DataTypes.BOOLEAN, terap: DataTypes.BOOLEAN, tgl_ramu: DataTypes.DATEONLY, tgl_rakit: DataTypes.DATEONLY, tgl_terap: DataTypes.DATEONLY },
  {
    freezeTableName: true,
  }
);

tkuModel.belongsTo(anggotaModel, { foreignKey: 'id_anggota' });

export default tkuModel;

(async () => {
  await db.sync();
})();
