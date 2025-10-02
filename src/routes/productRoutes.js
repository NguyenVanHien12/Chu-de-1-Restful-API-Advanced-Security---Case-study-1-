const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const productController = require('../controllers/productcontroller');
const productSchema = require('../validations/productValidation');

router.get('/products', productController.getAllProducts);
router.get('/products/search', productController.searchProducts);
router.get('/products/:id',productController.getProductById);
router.post('/products', validate(productSchema) ,productController.createProduct);
router.put('/products/:id',validate(productSchema), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);


module.exports = router;