const Joi = require('joi');

const sellerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = sellerSchema;