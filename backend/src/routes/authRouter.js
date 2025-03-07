const express = require('express');
const authController = require('../controllers/authController');
const { isAdmin, isLoggedIn} = require('../middleware/validate');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.createUser);

// router.get('/logout', authController.logout);

module.exports = router;
