const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function isAdmin(req, res, next) {
    if (!req.user || req.user.user_type !== 'admin') {
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden'
        });
    }
    next();
}

async function isLoggedIn(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(req.headers);
        console.log(token);
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("decoded", decoded);
        const session = await authModel.getSession(token);
        console.log("finished session");
        console.log(session);
        if (!session) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized: Invalid or expired session'
            });
        }
        req.user = decoded;
        console.log("going next");
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    isAdmin,
    isLoggedIn
}