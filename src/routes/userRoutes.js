const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { userSchema, loginSchema } = require('../validations/userValidation');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

router.post('/register', validate(userSchema), userController.registerUser);
router.post('/login', validate(loginSchema),userController.loginUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;