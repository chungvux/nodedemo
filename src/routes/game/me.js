const express = require('express');
const { meGameController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/my-hero/:idHero').get(authJwt, meGameController.getOneHero);
router.route('/my-hero').get(authJwt, meGameController.getAllHero);


module.exports = router;
