const Joi = require("joi");
const mongoose = require("mongoose");

const createArticle = Joi.object({
    title: Joi.string().required(),
    thumbnail: Joi.string().regex(/\.(jpg|jpeg|png)$/),
    description: Joi.string().required(),
    content:Joi.string().required(),
    slug:Joi.string(),
});

const editArticle = Joi.object({
    id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }).required(),
    title: Joi.string(),
    thumbnail: Joi.string().regex(/\.(jpg|jpeg|png)$/),
    description: Joi.string(),
    content:Joi.string(),
    slug:Joi.string(),
});

module.exports = { createArticle, editArticle };