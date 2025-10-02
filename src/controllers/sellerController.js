const Seller = require('../models/seller');

exports.createSeller = async (req, res) => {
    const seller = await Seller.create(req.validatedBody);
    res.status(201).json(seller);
};

exports.getAllSellers = async (req, res) => {
    const sellers = await Seller.findAll();
    res.json(sellers);
};

exports.getSellerById = async (req, res, next) => {
    const { id } = req.params;
    const seller = await Seller.findByPk(id);
    if (!seller) {
        return next({ status: 404, message: 'Seller not found' });
    }
    res.json(seller);
};

exports.updateSeller = async (req, res, next) => {
    const { id } = req.params;
    const seller = await Seller.findByPk(id);
    if (!seller) {
        return next({ status: 404, message: 'Seller not found' });
    }
    await seller.update(req.validatedBody);
    res.json(seller);
};

exports.deleteSeller = async (req, res, next) => {
    const { id } = req.params;
    const seller = await Seller.findByPk(id);
    if (!seller) {
        return next({ status: 404, message: 'Seller not found' });
    }
    await seller.destroy();
    res.status(204).send();
};