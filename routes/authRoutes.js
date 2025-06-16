// === routes/authRoutes.js ===
const express = require('express');
const router = express.Router();
const { login, register } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);

module.exports = router; // ← INI YANG BELUM ADA!
