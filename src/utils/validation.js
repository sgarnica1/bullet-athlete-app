const Joi = require("joi").extend(require("@joi/date"));

const validation = {
  // REGISTER NEW USER
  schemaRegister: Joi.object({
    idAdmin: Joi.string().required(),
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().min(10).max(10),
    birthDay: Joi.date().format("YYYY-MM-DD"),
    profilePicture: Joi.string(),
    password: Joi.string().min(6).max(30).required(),
    roles: Joi.array().items(Joi.string()),
  }),
  // LOGIN USER
  schemaLogin: Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  }),
  // REGISTER NEW WOD
  schemaWod: Joi.object({
    idUser: Joi.string().required(),
    date: Joi.date().format("YYYY-MM-DD").required(),
    description: Joi.string().required(),
    timecap: Joi.object().keys({
      minutes: Joi.number().integer().min(0).max(59).required(),
      seconds: Joi.number().integer().min(0).max(59).required(),
    }),
    scoreType: Joi.string().required(),
  }),
};

module.exports = validation;
