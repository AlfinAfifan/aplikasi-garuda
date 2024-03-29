const express = require('express');
const { createAnggota, deleteAnggota, getAnggota, getAnggotaById, updateAnggota } = require('../controller/anggotaController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();
// router.use(verifyToken);

// ROUTE GET ALL SURAT
router.get('/anggota', getAnggota);
// ROUTE GET SURAT BY ID
router.get('/anggota/:id', getAnggotaById);
// ROUTE CREATE SURAT
router.post('/anggota', createAnggota);
// ROUTE EDIT SURAT
router.patch('/anggota/:id', updateAnggota);
// ROUTE DELETE SURAT
router.delete('/anggota/:id', deleteAnggota);

module.exports = router;
