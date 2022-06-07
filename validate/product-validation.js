const Joi = require('joi');

const productAddValidate = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  base64Data: Joi.string().trim().required(),
});

const productUpdateValidate = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
});

module.exports = {
  productAddValidate: productAddValidate,
  productUpdateValidate: productUpdateValidate,
};
