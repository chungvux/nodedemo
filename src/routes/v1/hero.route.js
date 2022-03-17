const express = require('express');
const validate = require('../../middlewares/validate');
const {
  heroValidation
} = require('../../validations');
const {
  heroController
} = require('../../controllers');
const {
  authJwt
} = require('../../middlewares/jwtAuth');

const router = express.Router();

//router.get('/all-hero', authJwt, validate(heroValidation.typeHero), heroController.listHeroes);
router.get('/all-hero', authJwt, heroController.listHeroes);
router.get('/user-hero', authJwt, heroController.listHeroesUser);
router.get('/detail-hero', authJwt, validate(heroValidation.IDHero), heroController.detailHero);
router.post('/own-hero', authJwt, validate(heroValidation.ownHero), heroController.ownHero);

module.exports = router;
