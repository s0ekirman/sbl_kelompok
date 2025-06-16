const express = require('express');
const bodyParser = require('body-parser');
const karyawanRoutes = require('./routes/karyawanRoutes');
const absensiRoutes = require('./routes/absensiRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Untuk parsing JSON
app.use(bodyParser.json());

// Melayani file static seperti index.html dari folder /public
app.use(express.static('public'));

// Routing API
app.use('/karyawan', karyawanRoutes);
app.use('/absensi', absensiRoutes);
app.use('/', authRoutes); // auth tetap di root

// Jalankan server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

app.use('/', authRoutes); // Sudah benar






