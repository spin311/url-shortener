const express = require('express');
const authController = require('../controllers/authController');
const isAdmin = require('../middleware/validate');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', isAdmin, authController.createUser);
router.get('/logout', authController.logout);


