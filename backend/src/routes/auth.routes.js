// backend/src/routes/auth.routes.js
const express = require('express');
const { register, login, googleAuth,getUserProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/profile', protect, getUserProfile);

module.exports = router;