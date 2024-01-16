import express from 'express';
import { createAdmin, deleteAdmin, getAdmin, getAdminById, updateAdmin } from '../controller/adminController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/admin', getAdmin);
// ROUTE GET SURAT BY ID
router.get('/admin/:id', getAdminById);
// ROUTE CREATE SURAT
router.post('/admin', createAdmin);
// ROUTE EDIT SURAT
router.patch('/admin/:id', updateAdmin);
// ROUTE DELETE SURAT
router.delete('/admin/:id', deleteAdmin);

export default router;
