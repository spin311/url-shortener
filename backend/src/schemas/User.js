const joi = require('joi');

const userSchema = joi.object({
    username: joi.string().required(),
    user_type: joi.string().valid('admin', 'user').optional(),
    password: joi.string().required(),
    organization_id: joi.number().required()
});

const updateUserSchema = joi.object({
    username: joi.string(),
    user_type: joi.string().valid('admin', 'user'),
    password: joi.string(),
    organization_id: joi.number()
}).or('username', 'user_type', 'password', 'organization_id');

const validateUserData = (userData) => {
    return userSchema.validate(userData);
}

const validateUpdateUserData = (userData) => {
    return updateUserSchema.validate(userData);
}

module.exports = {
    validateUserData,
    validateUpdateUserData
}