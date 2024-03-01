const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

const usersModel = db.define(
  'users',
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = usersModel;

(async () => {
  await db.sync();
})();
