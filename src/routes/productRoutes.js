const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const productController = require('../controllers/productcontroller');
const productSchema = require('../validations/productValidation');

router.get('/products',productController.getAllProducts);
router.get('/products/search', productController.searchProducts);
router.get('/products/:id',productController.getProductById);
router.post('/products', auth, authorize(['admin', 'seller']), validate(productSchema),productController.createProduct);
router.put('/products/:id',auth,authorize(['admin', 'seller']) , validate(productSchema), productController.updateProduct);
router.delete('/products/:id',auth, authorize(['admin', 'seller']),productController.deleteProduct);

module.exports = router;