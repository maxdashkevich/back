import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])[a-zA-Z]{2,30}$'))
    .required(),

  surname: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])[a-zA-Z]{2,30}$'))
    .required(),

  login: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_]{5,20}$'))
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),

  role: Joi.string()
    .valid('admin', 'user')
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])[a-zA-Z]{2,30}$')),

  surname: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])[a-zA-Z]{2,30}$')),

  login: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_]{5,20}$')),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
});