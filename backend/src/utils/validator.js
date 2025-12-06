const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const postCreateSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().allow('').optional(),
    platform: Joi.string().optional(),
    status: Joi.string().valid('draft', 'scheduled', 'posted').optional(),
    scheduledAt: Joi.date().allow(null).optional(),
    metadata: Joi.object().optional()
});

module.exports = {
    registerSchema,
    loginSchema,
    postCreateSchema
};
