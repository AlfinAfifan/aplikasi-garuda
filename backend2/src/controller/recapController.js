const anggotaModel = require('../models/anggotaModel');
const usersModel = require('../models/usersModel');
const tkuModel = require('../models/tkuModel');
const tkkModel = require('../models/tkkModel');

exports.getDataRekap = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    const data = await anggotaModel.findAll({
        include: [
            {
                model:tkuModel,
                as: "tkk",
                where: {
                    id_anggota: 4
                }
            }
        ]
    });

    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
