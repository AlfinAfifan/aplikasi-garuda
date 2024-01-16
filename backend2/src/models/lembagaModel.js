import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const lembagaModel = db.define(
  'lembaga',
  { nama_lembaga: DataTypes.STRING, alamat: DataTypes.TEXT, no_gudep_lk: DataTypes.STRING, no_gudep_pr: DataTypes.STRING, kepsek: DataTypes.STRING, nip_kepsek: DataTypes.STRING },
  {
    freezeTableName: true,
  }
);

export default lembagaModel;

(async () => {
  await db.sync();
})();
