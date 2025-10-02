function errorResponse(res,statusCode, message, details = []) {
    return res.status(statusCode).json({
        success: false,
        error: {
            message,
            details
        }
    });
}

module.exports = errorResponse;