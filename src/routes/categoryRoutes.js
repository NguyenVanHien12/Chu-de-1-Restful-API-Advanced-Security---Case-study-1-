const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const categoryController = require('../controllers/categoryController');
const categorySchema = require('../validations/categoryValidation');

router.get('/categories', auth, authorize(['user', 'admin', 'seller']),categoryController.getAllCategory); // đúng tên hàm
router.post('/categories', auth, authorize(['admin']),validate(categorySchema), categoryController.createCategory);
router.get('/categories/:id',auth, authorize(['user', 'admin', 'seller']), categoryController.getCategoryById);
router.put('/categories/:id', auth, authorize(['admin']),validate(categorySchema), categoryController.updateCategory);
router.delete('/categories/:id', auth, authorize(['admin']),categoryController.deleteCategory);

module.exports = router;