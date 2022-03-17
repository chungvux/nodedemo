const Joi = require('joi');

const getBigLands = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.number().integer(),
  }),
};

const postAllSmallLands = {
  body: Joi.object().keys({
    idBigLand: Joi.number().integer().required(),
  }),
};

const getOneSmallLands = {
  params: Joi.object().keys({
    idSmallLand: Joi.string().required(),
  }),
};

const getOneMineral = {
  params: Joi.object().keys({
    idMineral: Joi.number().integer().required(),
  }),
};

module.exports = {
  getBigLands,
  postAllSmallLands,
  getOneSmallLands,
  getOneMineral,
};
