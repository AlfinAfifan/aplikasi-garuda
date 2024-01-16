import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import anggotaModel from './anggotaModel.js';
import jenisTkkModel from './jenisTkkModel.js';

const { DataTypes } = Sequelize;

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

export default tkkModel;

(async () => {
  await db.sync();
})();
