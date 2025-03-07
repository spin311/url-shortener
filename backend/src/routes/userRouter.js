const express = require('express');
const userController = require('../controllers/userController');
const { isAdmin, isLoggedIn} = require('../middleware/validate');
const {validateCreateUser, validateUpdateUser} = require('../middleware/validateRequest');

const router = express.Router();

router.post('/',validateCreateUser,  userController.createUser);
router.put('/:id',validateUpdateUser, isLoggedIn, isAdmin, userController.updateUser);

module.exports = router;
