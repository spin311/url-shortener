const express = require('express');
const authController = require('../controllers/authController');
const { isAdmin, isLoggedIn} = require('../middleware/validate');
const {validateCreateUser, validateUpdateUser} = require('../middleware/validateRequest');

const router = express.Router();

router.post('/login', authController.login);
router.post('/create',validateCreateUser, isLoggedIn, isAdmin, authController.createUser);
router.get('/logout', isLoggedIn, authController.logout);

module.exports = router;
