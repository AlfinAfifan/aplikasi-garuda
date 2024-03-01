const express = require('express');
const FileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const usersRoute = require('./routes/usersRoute.js');
const lembagaRoute = require('./routes/lembagaRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const anggotaRoute = require('./routes/anggotaRoute.js');
const tkuRoute = require('./routes/tkuRoute.js');
const tkkRoute = require('./routes/tkkRoute.js');
const jenisTkkRoute = require('./routes/jenisTkkRoute.js');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: ['http://localhost:5174', 'http://localhost:5173'],
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: ['https://manajemenkaranganyar.com'],
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
