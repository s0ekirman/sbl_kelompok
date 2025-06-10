const db = require('../config/db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM karyawan', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.create = (req, res) => {
    const { nama, jabatan } = req.body;
    db.query('INSERT INTO karyawan SET ?', { nama, jabatan }, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, nama, jabatan });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nama, jabatan } = req.body;
    db.query('UPDATE karyawan SET nama = ?, jabatan = ? WHERE id = ?', [nama, jabatan, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Karyawan diperbarui' });
    });
};

exports.remove = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM karyawan WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Karyawan dihapus' });
    });
};
