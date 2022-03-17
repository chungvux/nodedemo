const Joi = require('joi');

const typeHero = {
  body: Joi.object().keys({
    type: Joi.string().required(),
  }),
};
const IDHero = {
  body: Joi.object().keys({
    idHero: Joi.string().required(),
  }),
};
const ownHero = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    rarity: Joi.string().required(),
    skin: Joi.string().required(),
    quantityLandIsMining: Joi.number().required(),
    tokenId: Joi.number().required(),
  })
}



module.exports = {
  typeHero,
  IDHero,
  ownHero
};
