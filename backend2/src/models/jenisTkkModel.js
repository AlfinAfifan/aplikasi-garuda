import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import anggotaModel from './anggotaModel.js';

const { DataTypes } = Sequelize;

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

export default jenisTkkModel;

(async () => {
  await db.sync();
})();
