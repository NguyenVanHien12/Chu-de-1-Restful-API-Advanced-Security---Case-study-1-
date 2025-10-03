const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { userSchema, loginSchema } = require('../validations/userValidation');


router.post('/register', validate(userSchema), userController.registerUser);
router.post('/login', validate(loginSchema),userController.loginUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;