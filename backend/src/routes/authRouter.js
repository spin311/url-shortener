const express = require('express');
const authController = require('../controllers/authController');
const isAdmin = require('../middleware/validateRole');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', isAdmin, authController.register);
router.get('/logout', authController.logout);


