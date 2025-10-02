const Category = require('../models/category');
const categorySchema = require('../validations/categoryValidation');
const errorResponse = require('../utils/errorResponse');

exports.createCategory = async (req, res) => {
    const { error, value } = categorySchema.validate(req.body, {abortEarly: false});

    if (error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message));
    }

    try {
        const category = await Category.create(value);
        res.status(201).json(category);
    } catch (err) {
        errorResponse(res, 500, 'Failed to create category');
    }
}

exports.getAllCategory = async(req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        errorResponse(res, 500, 'Falied to get Categories');
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        res.json(category);
    } catch (err) {
        errorResponse(res, 500, 'Failed to get category');
    }
};

exports.updateCategory = async (req, res) => {
    const { error, value } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
        return errorResponse(res, 400, 'Validation error', error.details.map(e => e.message));
    }
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        await category.update(value);
        res.json(category);
    } catch (err) {
        errorResponse(res, 500, 'Failed to update category');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        await category.destroy();
        res.status(204).send();
    } catch (err) {
        errorResponse(res, 500, 'Failed to delete category');
    }
};
