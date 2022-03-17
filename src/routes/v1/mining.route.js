const express = require('express');
const { miningController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
const { checkBothHeroAndLand } = require('../../middlewares/customMiddleware');
const validate = require('../../middlewares/validate');
const { miningValidation } = require('../../validations')
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/claim').post(validate(miningValidation.land),authJwt, checkBothHeroAndLand, miningController.claim);
router.route('/start').post(validate(miningValidation.landAndHero),authJwt, checkBothHeroAndLand, miningController.start);
router.route('/end').post(validate(miningValidation.land),authJwt, checkBothHeroAndLand, miningController.end);
router.route('/change-hero').post(validate(miningValidation.landAndHero),authJwt, checkBothHeroAndLand, miningController.changeHero);

module.exports = router;
