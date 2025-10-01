const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = await Category.create({name});
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}

