const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const {email, password, role} = req.validatedBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword,
        role
    });
    res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role
    });
}

exports.loginUser = async (req, res, next) => {
    const {email, password} = req.validatedBody;
    const user = await User.findOne({ where: {email} }); 
    
    if(!user) {
        return next({ status: 401, message: 'Invalid email or password' });
    }
    //So sanh database
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return next({status: 401, message: 'Invalid email or password'});
    }
    //Sinh JWT
    const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
        {userId: user.id, role: user.role},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );
    res.json({accessToken, refreshToken});
}
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
          return next({ status: 401, message: 'No refresh token provided' });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Sinh access token mới
        const accessToken = jwt.sign(
            { userId: decoded.userId, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.json({ accessToken });
    } catch (err) {
        return next({ status: 401, message: 'Invalid refresh token' });
    }
};
