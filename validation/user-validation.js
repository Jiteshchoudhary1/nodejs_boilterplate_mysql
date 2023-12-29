const Joi = require("joi");

module.exports.createUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});


module.exports.login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
