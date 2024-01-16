import express from 'express';
import { createMadya, createPurwa, createUtama, deleteMadya, deletePurwa, deleteUtama, getMadya, getPurwa, getTkk, getTkkById, getUtama, updateTkk } from '../controller/tkkController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/tkk', getTkk);
router.get('/purwa', getPurwa);
router.get('/madya', getMadya);
router.get('/utama', getUtama);
// ROUTE GET SURAT BY ID
router.get('/tkk/:id', getTkkById);
// ROUTE CREATE SURAT
router.post('/purwa', createPurwa);
router.patch('/madya/:id', createMadya);
router.patch('/utama/:id', createUtama);
// ROUTE EDIT SURAT
router.patch('/tkk/:id', updateTkk);
// ROUTE DELETE SURAT
router.delete('/deletepurwa/:id', deletePurwa);
router.patch('/deletemadya/:id', deleteMadya);
router.patch('/deleteutama/:id', deleteUtama);

export default router;
