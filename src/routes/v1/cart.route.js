const express = require('express');
const { cartController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
const { checkIdSmallLand, checkOwnerLand } = require('../../middlewares/customMiddleware');
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/all').delete(cartController.deleteAll);

router.route('/:idSmallLand')
    .get(checkIdSmallLand,checkOwnerLand, cartController.addSmallLand)
    .delete(checkIdSmallLand, cartController.deleteSmallLand);

router.route('/').get(cartController.getCart);

module.exports = router;
