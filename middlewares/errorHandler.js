const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log lỗi ra console để debug

    // Mặc định lỗi 500 nếu không có status code cụ thể
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        message: message,
    });
};

module.exports = errorHandler;