const express = require('express');
const karyawanRoutes = require('./routes/karyawanRoutes');
const absensiRoutes = require('./routes/absensiRoutes');
const { login } = require('./middleware/auth');

const app = express();
app.use(express.json()); // built-in body parser

app.post('/login', login);
app.use('/karyawan', karyawanRoutes);
app.use('/absensi', absensiRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


