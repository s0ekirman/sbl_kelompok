// config/db.js
const mysql = require('mysql2'); // BUKAN 'mysql2/promise'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'absensi_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Koneksi MySQL berhasil');
});

module.exports = db; // WAJIB



