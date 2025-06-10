const express = require('express'); // <-- Tambahkan ini
const router = express.Router();

const controller = require('../controllers/absensiController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Misal: hanya admin2 yang boleh kelola absensi
router.get('/', authenticateToken, authorizeRoles(['admin2']), controller.getAll);
router.post('/', authenticateToken, authorizeRoles(['admin2']), controller.create);
router.put('/:id', authenticateToken, authorizeRoles(['admin2']), controller.update);
router.delete('/:id', authenticateToken, authorizeRoles(['admin2']), controller.remove);

module.exports = router;

