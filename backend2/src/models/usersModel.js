const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const lembagaModel = require('./lembagaModel.js');

const usersModel = db.define(
  'users',
  {
    name: DataTypes.STRING,
    id_lembaga: DataTypes.INTEGER,
    role: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
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
