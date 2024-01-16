import express from 'express';
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, updateAnggota } from '../controller/anggotaController.js';

const router = express.Router();

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

export default router;
