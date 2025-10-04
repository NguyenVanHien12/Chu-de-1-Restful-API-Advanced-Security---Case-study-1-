const errorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}]`, err);

    // Joi Validation error
    if (err.isJoi) {
        return errorResponse(res, 400, 'Validation', err.details.map(e => e.message));
    }

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        return errorResponse(res, 409, 'Conflict error', err.errors.map(e => e.message));
    }

    // Lỗi có status và message (ví dụ: phân quyền, xác thực)
    if (err.status && err.message) {
        return errorResponse(res, err.status, err.message, err.details || []);
    }

    // Các lỗi khác
    errorResponse(res, 500, 'Internal server error');
}