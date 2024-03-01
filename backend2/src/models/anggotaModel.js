const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const lembagaModel = require('./lembagaModel.js');

const anggotaModel = db.define(
  'anggota',
  {
    nama: DataTypes.STRING,
    id_lembaga: DataTypes.INTEGER,
    no_induk: DataTypes.STRING,
    nta: DataTypes.STRING,
    tmpt_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    agama: DataTypes.STRING,
    warga: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    ds_kelurahan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kab_kota: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    map: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    bakat_hobi: DataTypes.STRING,
    nama_ayah: DataTypes.STRING,
    tmpt_lahir_ayah: DataTypes.STRING,
    tgl_lahir_ayah: DataTypes.DATEONLY,
    nama_ibu: DataTypes.STRING,
    tmpt_lahir_ibu: DataTypes.STRING,
    tgl_lahir_ibu: DataTypes.DATEONLY,
    alamat_ortu: DataTypes.STRING,
    no_telp_ortu: DataTypes.STRING,
    tgl_masuk_pangkalan: DataTypes.DATEONLY,
    tingkat_masuk: DataTypes.STRING,
    tgl_keluar_pangkalan: DataTypes.DATEONLY,
    alasan_keluar: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

anggotaModel.belongsTo(lembagaModel, { foreignKey: 'id_lembaga' });

module.exports = anggotaModel;

(async () => {
  await db.sync();
})();
