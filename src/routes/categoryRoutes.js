const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const categoryController = require('../controllers/categoryController');
const categorySchema = require('../validations/categoryValidation');

router.get('/categories', categoryController.getAllCategory); // đúng tên hàm
router.post('/categories', validate(categorySchema), categoryController.createCategory);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', validate(categorySchema), categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;