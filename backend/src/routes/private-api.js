import express from 'express';
import userController from '../controller/user-controller.js';
import lembagaController from '../controller/lembaga-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import jenisTkkController from '../controller/jenis-tkk-controller.js';
import anggotaController from '../controller/anggota-controller.js';
import tkuController from '../controller/tku-controller.js';
import tkkController from '../controller/tkk-controller.js';
import rekapController from '../controller/rekap-controller.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.use(errorMiddleware);

userRouter.get('/api/users', userController.getAllUser);
userRouter.get('/api/users/:id', userController.getUser);
userRouter.patch('/api/users/update/:id', userController.updateUser);
userRouter.delete('/api/users/logout', userController.logout);
userRouter.delete('/api/users/delete/:id', userController.deleteUser);

userRouter.post('/api/lembaga/create', lembagaController.createLembaga);
userRouter.get('/api/lembaga', lembagaController.getAllLembaga);
userRouter.get('/api/lembaga/:id', lembagaController.getLembaga);
userRouter.patch('/api/lembaga/update/:id', lembagaController.updateLembaga);
userRouter.delete('/api/lembaga/delete/:id', lembagaController.deleteLembaga);

userRouter.post('/api/jenis-tkk/create', jenisTkkController.createJenisTkk);
userRouter.get('/api/jenis-tkk', jenisTkkController.getAllJenisTkk);
userRouter.get('/api/jenis-tkk/:id', jenisTkkController.getJenisTkk);
userRouter.patch('/api/jenis-tkk/update/:id', jenisTkkController.updateJenisTkk);
userRouter.delete('/api/jenis-tkk/delete/:id', jenisTkkController.deleteJenisTkk);

userRouter.post('/api/anggota/create', anggotaController.createAnggota);
userRouter.get('/api/anggota/', anggotaController.getAllAnggota);
userRouter.get('/api/anggota/:id', anggotaController.getAnggota);
userRouter.patch('/api/anggota/update/:id', anggotaController.updateAnggota);
userRouter.delete('/api/anggota/delete/:id', anggotaController.deleteAnggota);

userRouter.post('/api/ramu/create', tkuController.createRamu);
userRouter.post('/api/rakit/create', tkuController.createRakit);
userRouter.post('/api/terap/create', tkuController.createTerap);
userRouter.post('/api/tku', tkuController.getTkk);
userRouter.post('/api/tku/delete', tkuController.deleteTku);

userRouter.post('/api/purwa/create', tkkController.createPurwa);
userRouter.post('/api/madya/create', tkkController.createMadya);
userRouter.post('/api/utama/create', tkkController.createUtama);
userRouter.post('/api/tkk', tkkController.getTkk);
userRouter.post('/api/tkk/delete', tkkController.deleteTkk);

userRouter.get('/api/rekap', rekapController.getDataRekap)
userRouter.get('/api/summary', rekapController.getDataSummary)

export { userRouter };
