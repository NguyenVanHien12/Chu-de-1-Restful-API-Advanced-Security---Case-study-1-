module.exports = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return next(error);
    }
    req.validatedBody = value; // Đúng chuẩn
    next();
};