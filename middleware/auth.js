// === middleware/auth.js ===
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SECRET_KEY = 'secret123';

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM akun WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = results[0];
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Token tidak ditemukan' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });
        req.user = user;
        next();
    });
};

exports.register = (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, dan role wajib diisi' });
    }

    const checkQuery = 'SELECT * FROM akun WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (results.length > 0) {
            return res.status(409).json({ message: 'Username sudah digunakan' });
        }

        const insertQuery = 'INSERT INTO akun (username, password, role) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, role], (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal menambahkan akun' });

            res.json({ message: 'Akun berhasil dibuat', id: result.insertId });
        });
    });
};