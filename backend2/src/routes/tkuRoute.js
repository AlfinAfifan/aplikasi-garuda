const express = require('express');
const { createTku, deleteRakit, deleteRamu, deleteTerap, getRakit, getRamu, getTerap, getTku, getTkuById, updateRakit, updateTerap, updateTku, getYearRamu, getYearRakit, getYearTerap } = require('../controller/tkuController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/tku', getTku);
router.get('/ramu/:year', getRamu);
router.get('/rakit/:year', getRakit);
router.get('/terap/:year', getTerap);
router.get('/tku/:id', getTkuById);
router.get('/yearramu', getYearRamu);
router.get('/yearrakit', getYearRakit);
router.get('/yearterap', getYearTerap);
// ROUTE CREATE SURAT
router.post('/tku', createTku);
// ROUTE EDIT SURAT
router.patch('/tku/:id', updateTku);
router.patch('/rakit/:id', updateRakit);
router.patch('/terap/:id', updateTerap);
// ROUTE DELETE SURAT
router.delete('/deleteramu/:id', deleteRamu);
router.patch('/deleterakit/:id', deleteRakit);
router.patch('/deleteterap/:id', deleteTerap);

module.exports = router;
