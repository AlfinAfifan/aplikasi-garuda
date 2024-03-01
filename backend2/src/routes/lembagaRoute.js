const express = require('express');
const { createLembaga, deleteLembaga, getLembaga, getLembagaById, updateLembaga } = require('../controller/lembagaController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/lembaga', getLembaga);
// ROUTE GET SURAT BY ID
router.get('/lembaga/:id', getLembagaById);
// ROUTE CREATE SURAT
router.post('/lembaga', createLembaga);
// ROUTE EDIT SURAT
router.patch('/lembaga/:id', updateLembaga);
// ROUTE DELETE SURAT
router.delete('/lembaga/:id', deleteLembaga);

module.exports = router;
