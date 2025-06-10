const db = require('../config/db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM absensi', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.create = (req, res) => {
    const { karyawan_id, tanggal, status } = req.body;
    db.query('INSERT INTO absensi SET ?', { karyawan_id, tanggal, status }, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, karyawan_id, tanggal, status });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { karyawan_id, tanggal, status } = req.body;
    db.query('UPDATE absensi SET karyawan_id=?, tanggal=?, status=? WHERE id=?', [karyawan_id, tanggal, status, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Absensi diperbarui' });
    });
};

exports.remove = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM absensi WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Absensi dihapus' });
    });
};
