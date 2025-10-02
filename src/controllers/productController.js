const { Op } = require('sequelize');
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.validatedBody);
    res.status(201).json(product);
};

exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return next({ status: 404, message: 'Product not found' });
    }
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return next({ status: 404, message: 'Product not found' });
    }
    await product.update(req.validatedBody);
    res.json(product);
}

exports.deleteProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return next({ status: 404, message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
}

exports.searchProducts = async (req, res) => {
    const { name, minPrice, maxPrice, status, categoryId, sellerId } = req.query;
    const where = {};

    if (name) {
        where.name = { [Op.like]: `%${name}%` };
    }
    if (minPrice) {
        where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    }
    if (maxPrice) {
        where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    }
    if (status) {
        where.status = status;
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    if (sellerId) {
        where.sellerId = sellerId;
    }

    const products = await Product.findAll({ where });
    res.json(products);
};