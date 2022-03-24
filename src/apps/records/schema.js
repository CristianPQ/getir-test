const Joi = require("joi");

module.exports = {
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  minCount: Joi.number().min(0),
  maxCount: Joi.number().min(0),
};
