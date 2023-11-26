const Joi = require("joi");

const createMenu = Joi.object({
    menu_title: Joi.string().required(),
    sub_menu: Joi.string(),
    visibility:Joi.boolean(),
    order:Joi.number()
});

const editMenu  = Joi.object({
    menu_title: Joi.string(),
    sub_menu: Joi.string(),
    visibility:Joi.boolean(),
    order:Joi.number()
})


module.exports = { createMenu, editMenu };