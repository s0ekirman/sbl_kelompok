const db = require('../config/db');

// Ambil semua data absensi
exports.getAll = (req, res) => {
    const sql = `
        SELECT absensi.*, karyawan.nama 
        FROM absensi 
        JOIN karyawan ON absensi.karyawan_id = karyawan.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.json(results);
    });
};

// Input absensi baru
exports.create = (req, res) => {
    const { karyawan_id, tanggal, status } = req.body;

    if (!karyawan_id || !tanggal || !status) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const checkQuery = 'SELECT * FROM absensi WHERE karyawan_id = ? AND tanggal = ?';
    db.query(checkQuery, [karyawan_id, tanggal], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error saat validasi' });

        if (results.length > 0) {
            return res.status(409).json({ message: 'Karyawan sudah absen di tanggal ini' });
        }

        const sql = 'INSERT INTO absensi (karyawan_id, tanggal, status) VALUES (?, ?, ?)';
        db.query(sql, [karyawan_id, tanggal, status], (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal menyimpan absensi' });
            res.json({ message: 'Absensi berhasil disimpan', id: result.insertId });
        });
    });
};

// Update absensi
exports.update = (req, res) => {
    const { id } = req.params;
    const { karyawan_id, tanggal, status } = req.body;

    if (!karyawan_id || !tanggal || !status) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const sql = 'UPDATE absensi SET karyawan_id=?, tanggal=?, status=? WHERE id=?';
    db.query(sql, [karyawan_id, tanggal, status, id], (err) => {
        if (err) return res.status(500).json({ message: 'Gagal update absensi' });
        res.json({ message: 'Absensi diperbarui' });
    });
};

// Hapus absensi
exports.remove = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM absensi WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Gagal hapus absensi' });
        res.json({ message: 'Absensi dihapus' });
    });
};


