import Joi from 'joi';

//  реєстрація
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': "Ім'я повинно містити не менше 3 символів",
    'string.max': "Ім'я повинно містити не більше 30 символів",
    'any.required': 'Поле "name" є обов’язковим для заповнення',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Некоректний формат email',
    'any.required': 'Поле "email" є обов’язковим для заповнення',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль повинен містити не менше 6 символів',
    'any.required': 'Поле "password" є обов’язковим для заповнення',
  }),
});

//  вхід
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некоректний формат email',
    'any.required': 'Поле "email" є обов’язковим для заповнення',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль повинен містити не менше 6 символів',
    'any.required': 'Поле "password" є обов’язковим для заповнення',
  }),
});

export const resetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email field is required",
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});