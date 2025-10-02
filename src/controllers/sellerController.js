const Seller = require('../models/seller');
const sellerSchema = require('../validations/sellerValidation');
const errorResponse = require('../utils/errorResponse');

exports.createSeller = async (req, res) => {
    const { error, value } = sellerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message));
    }
    try {
        const seller = await Seller.create(value);
        res.status(201).json(seller);
    } catch (err) {
        errorResponse(res, 500, 'Failed to create seller');
    }
};

exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll();
        res.json(sellers);
    } catch (err) {
        errorResponse(res, 500, 'Failed to get sellers');
    }
};

exports.getSellerById = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await Seller.findByPk(id);
        if (!seller) {
            return errorResponse(res, 404, 'Seller not found');
        }
        res.json(seller);
    } catch (err) {
        errorResponse(res, 500, 'Failed to get seller');
    }
};

exports.updateSeller = async (req, res) => {
    const { error, value } = sellerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message));
    }
    try {
        const { id } = req.params;
        const seller = await Seller.findByPk(id);
        if (!seller) {
            return errorResponse(res, 404, 'Seller not found');
        }
        await seller.update(value);
        res.json(seller);
    } catch (err) {
        errorResponse(res, 500, 'Failed to update seller');
    }
};

exports.deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await Seller.findByPk(id);
        if (!seller) {
            return errorResponse(res, 404, 'Seller not found');
        }
        await seller.destroy();
        res.status(204).send();
    } catch (err) {
        errorResponse(res, 500, 'Failed to delete seller');
    }
};