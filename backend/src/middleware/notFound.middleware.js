const { failure } = require('../utils/apiResponse');

function notFoundMiddleware(req, res) {
    return failure(res, `Route not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND', 404);
}

module.exports = notFoundMiddleware;
