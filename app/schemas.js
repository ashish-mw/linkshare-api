const joi = require("joi");

exports.createUserSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.createSessionSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.createShareSchema = joi.object().keys({
  title: joi.string().required(),
  link: joi.string().required(),
});

exports.updateShareSchema = joi.object().keys({
  title: joi.string().required(),
});
