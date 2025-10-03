module.exports = (roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)) {
       return next({ status: 403, message: 'Forbidden: You do not have permission' });
    }
    next();
}