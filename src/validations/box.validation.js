const Joi = require('joi');

const token = {
  body: Joi.object().keys({
    tokenId: Joi.number().required(),
  }),
};

const getAddress = {
  body: Joi.object().keys({
    address: Joi.string().required(),
    box: Joi.string().required(),
  })
}



module.exports = {
  token,
  getAddress
};
