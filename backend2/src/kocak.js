import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import usersRoute from './routes/usersRoute.js';
import lembagaRoute from './routes/lembagaRoute.js';
import adminRoute from './routes/adminRoute.js';
import anggotaRoute from './routes/anggotaRoute.js';
import tkuRoute from './routes/tkuRoute.js';
import tkkRoute from './routes/tkkRoute.js';
import jenisTkkRoute from './routes/jenisTkkRoute.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5174', 'http://localhost:5173'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));

// USERS
app.use(usersRoute);
// SURAT MASUK
app.use(lembagaRoute);
app.use(adminRoute);
app.use(anggotaRoute);
app.use(tkuRoute);
app.use(tkkRoute);
app.use(jenisTkkRoute);

app.listen(PORT, () => console.log(`the server is running on port ${PORT}....`));
