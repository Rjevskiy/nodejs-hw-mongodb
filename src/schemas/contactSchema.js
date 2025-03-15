import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().allow(""),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid("work", "personal").required(),
});
