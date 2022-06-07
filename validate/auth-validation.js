const Joi = require('joi');

const validateUser = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(6).required(),
});

const validatelogin = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const verifyConfirmValidate = Joi.object({
  email: Joi.string().email().trim().required(),
  otp: Joi.string().trim().required(),
});

const resendOtpValidate = Joi.object({
  email: Joi.string().email().trim().required(),
});

module.exports = {
  validatelogin: validatelogin,
  validateUser: validateUser,
  verifyConfirmValidate: verifyConfirmValidate,
  resendOtpValidate: resendOtpValidate,
};
