const express = require('express');
const { meController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/my-hero/quantity').get(authJwt, meController.countMyHero);
router.route('/my-land/quantity').get(authJwt, meController.countMyLand);
router.route('/my-hero/:idHero').get(authJwt, meController.getOneMyHero);
router.route('/my-land/:idLand').get(authJwt, meController.getOneMyLand);
router.route('/my-hero').get(authJwt, meController.getMyHero);
router.route('/my-land').get(authJwt, meController.getMyLand);

module.exports = router;
