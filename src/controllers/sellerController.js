const Seller = require('../models/seller');

exports.createSeller = async (req, res) => {
    try {
        const { name, email } = req.body;
        const seller = await Seller.create({ name, email });
        res.status(201).json(seller);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create seller' });
    }
};

