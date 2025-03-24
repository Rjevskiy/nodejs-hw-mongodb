import Joi from 'joi';

//  регистрация
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Имя должно быть не менее 3 символов',
    'string.max': 'Имя должно быть не более 30 символов',
    'any.required': 'Поле "name" обязательно для заполнения',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный формат email',
    'any.required': 'Поле "email" обязательно для заполнения',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль должен содержать не менее 6 символов',
    'any.required': 'Поле "password" обязательно для заполнения',
  }),
});

//  логин
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный формат email',
    'any.required': 'Поле "email" обязательно для заполнения',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль должен содержать не менее 6 символов',
    'any.required': 'Поле "password" обязательно для заполнения',
  }),
});
