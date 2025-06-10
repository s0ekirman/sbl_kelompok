// === server.js ===
const express = require('express');
const bodyParser = require('body-parser');
const karyawanRoutes = require('./routes/karyawanRoutes');
const absensiRoutes = require('./routes/absensiRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/absensi', absensiRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});



