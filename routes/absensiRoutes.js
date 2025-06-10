const express = require('express');
const router = express.Router();
const controller = require('../controllers/absensiController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, controller.getAll);
router.post('/', authenticateToken, controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);

module.exports = router;
