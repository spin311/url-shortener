const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const SECRET_KEY = process.env.SECRET_KEY;


async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await authModel.login(username);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return next(createError(401, 'Invalid credentials'));
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, user_type: user.user_type, organization_id: user.organization_id },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        const createSession = await authModel.createSession(user.id, token, expiresAt);
        if (!createSession || !createSession.affectedRows) {
            return next(createError(500, 'Could not create session'));
        }
        res.json({
           token});
    } catch (error) {
        next(error);
    }
}



async function logout(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const deleteSession = await authModel.deleteSession(token);
        if (!deleteSession || !deleteSession.affectedRows) {
            return next(createError(401, 'Could not delete session'));
        }
        res.json({
            status: 'success',
            message: 'Logged out'});
    } catch (e) {
        next(e)
    }
}

module.exports = {
    login,
    logout
}