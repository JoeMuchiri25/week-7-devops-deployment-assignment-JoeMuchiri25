const express = require('express');
const router = express.Router();
const { login, register, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, getUsers); // 🔥 new route to get all users except current

module.exports = router;
