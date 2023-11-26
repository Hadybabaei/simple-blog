const Joi = require("joi");
const mongoose = require("mongoose");

const createCategory = Joi.object({
    title: Joi.string().required(),
    thumbnail: Joi.string().regex(/\.(jpg|jpeg|png)$/),
    description: Joi.string()
});

const editCategory = Joi.object({
    id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }).required(),
    title: Joi.string(),
    thumbnail: Joi.string().regex(/\.(jpg|jpeg|png)$/),
    description: Joi.string()
});

module.exports = { createCategory, editCategory };