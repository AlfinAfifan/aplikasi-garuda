import express from 'express';
import { createLembaga, deleteLembaga, getLembaga, getLembagaById, updateLembaga } from '../controller/lembagaController.js';

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

export default router;
