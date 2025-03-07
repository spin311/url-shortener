const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    logger(message);
    res.status(status).json({
        status: 'error',
        code: status,
        message: message
    });
}

module.exports = errorHandler;