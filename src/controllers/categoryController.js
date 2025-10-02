const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    const category = await Category.create(req.validatedBody);
    res.status(201).json(category);
};

exports.getAllCategory = async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
};

exports.getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return next({ status: 404, message: 'Category not found' });
    }
    res.json(category);
};

exports.updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return next({ status: 404, message: 'Category not found' });
    }
    await category.update(req.validatedBody);
    res.json(category);
};

exports.deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return next({ status: 404, message: 'Category not found' });
    }
    await category.destroy();
    res.status(204).send();
};