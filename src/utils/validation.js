const Joi = require("joi").extend(require("@joi/date"));

const schemaRegister = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().min(10).max(10),
  birthDay: Joi.date().format("YYYY-MM-DD"),
  profilePicture: Joi.string(),
  password: Joi.string().min(6).max(30).required(),
  roles: Joi.array().items(Joi.string())
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  schemaRegister,
  schemaLogin,
};
