const bcrypt = require("bcrypt");
const userModel = require('../models/userModel');
const SALT_ROUNDS = 10;
const createError = require('http-errors');

async function createUser(req, res, next) {
    try {
        const { username, password, organization_id, user_type } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await userModel.createUser(username, hashedPassword, organization_id, user_type);
        if (!user || !user.affectedRows) {
            return next(createError(500, 'Could not create user'));
        }
        res.status(201).json({
            status: 'success',
            message: 'User created'
        });
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const fields = req.body;
        if (fields.password) {
            fields.password = await bcrypt.hash(fields.password, SALT_ROUNDS);
        }
        const updatedUser = await userModel.updateUser(id, fields);
        if (!updatedUser || !updatedUser.affectedRows) {
            return next(createError(500, 'Could not update user'));
        }
        res.json({
            status: 'success',
            message: 'User updated'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    updateUser
}