const Joi = require('joi');

const ProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().integer().min(1).required(),
    stock: Joi.number().integer().min(0).required(),
    status: Joi.string().valid('available', 'unvailable').required(),
    categoryId: Joi.number().integer().required(),
    sellerId: Joi.number().integer().required()
});

module.exports = ProductSchema ;