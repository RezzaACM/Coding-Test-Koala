import Joi from 'joi';

export const registerValidation = (data) => {
    const schema = Joi.object({
        customer_name: Joi.required(),
        email: Joi.required(),
        phone_number: Joi.required(),
        sex: Joi.required(),
        password: Joi.required(),
    })

    return schema.validate(data)
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        phone_or_email: Joi.required(),
        password: Joi.required()
    })

    return schema.validate(data);
}