const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = 10;


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
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, user_type: user.user_type },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        const createSession = await authModel.createSession(user.id, token, expiresAt);
        if (!createSession || !createSession.affectedRows) {
            return res.status(500).json({
                status: 'error',
                message: 'Could not create session'
            });
        }
        res.json({
           token});
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { username, password, organization_id, user_type } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await authModel.createUser(username, hashedPassword, organization_id, user_type);
        if (!user || !user.affectedRows) {
            return res.status(500).json({
                status: 'error',
                message: 'Could not register user'
            });
        }
        res.json({
            status: 'success',
            message: 'User created'
        });
    } catch (error) {
        next(error);
    }

}

async function logout(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const session = await authModel.getSession(token);
        const deleteSession = await authModel.deleteSession(token);
        if (!deleteSession || !deleteSession.affectedRows) {
            return res.status(500).json({
                status: 'error',
                message: 'Could not logout'
            });
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
    logout,
    createUser
}