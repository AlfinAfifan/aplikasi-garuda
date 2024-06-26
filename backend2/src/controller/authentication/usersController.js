const usersModel = require('../../models/usersModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { refreshToken } = require('./refreshToken.js');

// CONTROLLER GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

// CONTROLLER CREATE USERS
exports.createUsers = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({
      message: `password and confirm password doesn't match`,
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await usersModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({
      message: 'Create Users Success',
    });
  } catch (error) {
    res.json({
      message: 'Create Users Failed',
    });
  }
};

// CONTROLLER LOGIN USERS
exports.loginUsers = async (req, res) => {
  try {
    const user = await usersModel.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: 'wrong password' });
    const userid = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const idLembaga = user[0].id_lembaga;

    const accessToken = jwt.sign({ userid, name, email, idLembaga }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    const refreshTokenToken = jwt.sign({ userid, name, email, idLembaga }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    await usersModel.update(
      { refresh_token: refreshTokenToken },
      {
        where: {
          id: userid,
        },
      }
    );
    res.cookie('refreshToken', refreshTokenToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({
      message: "Email Doesn't Found!",
    });
  }
};

// CONTROLLER LOGOUT USERS
exports.logoutUsers = async (req, res) => {
  const refreshTokenToken = req.cookies.refreshToken;
  if (!refreshTokenToken) return res.sendStatus(204);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshTokenToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userid = user[0].id;
  await usersModel.update(
    { refresh_token: null },
    {
      where: {
        id: userid,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};
