const express = require('express');
const { cartController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
const { checkIdSmallLand, checkOwnerLand } = require('../../middlewares/customMiddleware');
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/all').delete(authJwt, cartController.deleteAll);

router.route('/:idSmallLand')
    .get(authJwt,checkIdSmallLand,checkOwnerLand, cartController.addSmallLand)
    .delete(authJwt,checkIdSmallLand, cartController.deleteSmallLand);

router.route('/').get(authJwt, cartController.getCart);

module.exports = router;
