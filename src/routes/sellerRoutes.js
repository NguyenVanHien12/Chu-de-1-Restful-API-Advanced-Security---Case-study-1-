const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const sellerSchema = require('../validations/sellerValidation');
const sellerController = require('../controllers/sellerController');

router.get('/sellers', auth, authorize(['admin', 'user', 'seller']), sellerController.getAllSellers);
router.get('/sellers/:id', auth, authorize(['admin', 'user', 'seller']), sellerController.getSellerById);
router.post('/sellers',auth, authorize('admin'),validate(sellerSchema),sellerController.createSeller);
router.put('/sellers/:id',authorize('admin'), validate(sellerSchema),sellerController.updateSeller);
router.delete('/sellers/:id',authorize('admin'), sellerController.deleteSeller);

module.exports = router;