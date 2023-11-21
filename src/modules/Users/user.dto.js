const Joi = require("joi");

const register = Joi.object({
    name:Joi.string().required(),
    lastname:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
})

const login = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})

module.exports =  { register,login }; 