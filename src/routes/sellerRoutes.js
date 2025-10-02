const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const sellerSchema = require('../validations/sellerValidation');
const sellerController = require('../controllers/sellerController');

router.post('/sellers', validate(sellerSchema),sellerController.createSeller);
router.put('/sellers/:id', validate(sellerSchema),sellerController.updateSeller);
router.get('/sellers', sellerController.getAllSellers);
router.get('/sellers/:id', sellerController.getSellerById);
router.delete('/sellers/:id', sellerController.deleteSeller);

module.exports = router;