const { Op } = require('sequelize');
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch(err) {
        res.status(500).json({error: 'Failed to fetch products'});
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, status, categoryId, sellerId } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            status,
            categoryId,
            sellerId
        });
        res.status(201).json(product);
    } catch(err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get product by ID' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, description, price, stock, status, categoryId, sellerId } = req.body;
        const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        await product.update({
            name,
            description,
            price,
            stock,
            status,
            categoryId,
            sellerId
        });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        await product.destroy();

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
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
        res.status(500).json({ error: 'Failed to search products' });
    }
};