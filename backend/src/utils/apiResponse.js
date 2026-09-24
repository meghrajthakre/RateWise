function success(res, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
}

function failure(res, message, code, statusCode = 500) {
    return res.status(statusCode).json({ success: false, message, code });
}

module.exports = { success, failure };
