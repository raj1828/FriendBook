const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register new User
router.post('/register', register);

//login an existing user
router.post('/login', login);

module.exports = router;