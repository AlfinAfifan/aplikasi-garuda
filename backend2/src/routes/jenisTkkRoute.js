const express = require('express');
const { createJenisTkk, deleteJenisTkk, getJenisTkk, getJenisTkkById, updateJenisTkk } = require('../controller/jenisTkkController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/jenistkk', getJenisTkk);
// ROUTE GET SURAT BY ID
router.get('/jenistkk/:id', getJenisTkkById);
// ROUTE CREATE SURAT
router.post('/jenistkk', createJenisTkk);
// ROUTE EDIT SURAT
router.patch('/jenistkk/:id', updateJenisTkk);
// ROUTE DELETE SURAT
router.delete('/jenistkk/:id', deleteJenisTkk);

module.exports = router;
