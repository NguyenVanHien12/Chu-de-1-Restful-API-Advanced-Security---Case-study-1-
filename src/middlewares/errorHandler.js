const errorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
    //Ghi loi log ra console vs thoi gian & thong tin
    console.error(`[${new Date().toISOString()}]`, err);

    //Joi Validation error
    if(err.isJoi) {
        return errorResponse(res, 400, 'Validation', err.details.map(e => e.message));
    }

    //Sequelize unique contraint error
    if(err.name === 'SequelizeUniqueConstraintError') {
        return errorResponse(res, 409, 'Conflict error', err.errors.map(e => e.message));
    }

    //Cac loi khac
    
    errorResponse(res, 500, 'Internal server error');
}