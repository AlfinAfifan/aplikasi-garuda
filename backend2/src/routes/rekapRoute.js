const express = require('express');
const { getDataRekap } = require('../controller/recapController');

const router = express.Router();
router.get('/rekap', getDataRekap)


module.exports = router