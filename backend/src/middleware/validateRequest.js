const createError = require('http-errors');
const logger = require('../utils/logger');
const { validateUserData, validateUpdateUserData } = require('../schemas/User');


function validateCreateUser(req, res, next) {
    const userData = req.body;
    const { error } = validateUserData(userData);
    if (error) {
        logger(error);
        return next(createError(400, error.details[0].message));
    }
    next();
}

function validateUpdateUser(req, res, next) {
    const userData = req.body;
    const { error } = validateUpdateUserData(userData);
    if (error) {
        logger(error);
        return next(createError(400, error.details[0].message));
    }
    next();
}

module.exports = {
    validateCreateUser,
    validateUpdateUser
}