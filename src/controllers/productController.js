const { Op } = require('sequelize');
const Product = require('../models/product');
const productSchema = require('../validations/productValidation');
const errorResponse = require('../utils/errorResponse');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch(err) {
        errorResponse(res, 500, 'Falied to get products');
    }
};


exports.createProduct = async (req, res) => {
    const {error, value} = productSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message))
    }
    try {
        const product = await Product.create(value);
        res.status(201).json(product);
    } catch(err) {
        errorResponse(res, 500, 'Falied to create product');
    }
}

exports.getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if(!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        res.json(product);
    } catch (err) {
        errorResponse(res, 500, 'Failed to get product by ID');
    }
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const {error, value } = productSchema.validate(req.body, { abortEarly: false });
    if(error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message));
    }

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        await product.update(value);
        res.json(product);
    } catch (err) {
        errorResponse(res, 500, 'Failed to update product');
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        await product.destroy();

        res.status(204).send();
    } catch (err) {
        errorResponse(res, 500, 'Failed to delete product');
    }
}

exports.searchProducts = async (req, res) => {
    try {
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
        res.json(products); // Luôn trả về mảng, không trả về 404
    } catch (err) {
        errorResponse(res, 500, 'Failed to search products');
    }
};