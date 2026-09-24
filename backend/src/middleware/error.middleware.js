const { failure } = require('../utils/apiResponse');
const logger = require('../utils/logger');

function errorMiddleware(error, req, res, next) {
    logger.error(error.stack || error.message);
    if (res.headersSent) return next(error);
    if (error.type === 'entity.too.large') {
        return failure(res, 'Request body is too large', 'REQUEST_TOO_LARGE', 413);
    }
    return failure(res, 'Internal server error', 'INTERNAL_ERROR', 500);
}

module.exports = errorMiddleware;
