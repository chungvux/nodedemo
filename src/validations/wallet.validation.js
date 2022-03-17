const Joi = require('joi');

const IdWallet = {
  body: Joi.object().keys({
    idWallet: Joi.string().required(),
  }),
};

module.exports = {
  IdWallet
}
