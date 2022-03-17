const Joi = require('joi');

const landAndHero = {
    body: Joi.object().keys({
        idSmallLand: Joi.string().required(),
        idHero: Joi.string().required()
    }),
};

const land = {
    body: Joi.object().keys({
        idSmallLand: Joi.string().required(),
    }),
};

module.exports = {
    landAndHero,
    land
};
