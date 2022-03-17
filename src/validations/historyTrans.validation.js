const Joi = require('joi');

const Item = {
  body: Joi.object().keys({
    item: Joi.string().required(),
  }),
};

module.exports = {
  Item
}
