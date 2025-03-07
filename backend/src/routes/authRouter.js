const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/validate');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', isLoggedIn, authController.logout);

module.exports = router;
