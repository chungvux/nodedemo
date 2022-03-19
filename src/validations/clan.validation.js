const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    language: Joi.string().required(),
    requiredPoint: Joi.number().required(),
  })
}
const search = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  })
}



module.exports = {
  create,
  search
};
