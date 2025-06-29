const Joi = require('joi');
const validateRegistration = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })
    return schema.validate(data)
}


const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(data)
}

module.exports = { validateRegistration, validateLogin }
