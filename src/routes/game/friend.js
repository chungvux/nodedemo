const express = require('express');
const { friendController } = require('../../controllers');
const { authJwt } = require('../../middlewares/jwtAuth');
const { checkIsAddress } = require('../../middlewares/customMiddleware')
// const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/add').post(authJwt,checkIsAddress('body','address'), friendController.addFriend);
router.route('/remove').post(authJwt,checkIsAddress('body','address'), friendController.removeFriend);
router.route('/search').post(authJwt,checkIsAddress('body','address'), friendController.search);
router.route('/').post(authJwt,checkIsAddress('body','address'), friendController.listFriend);


module.exports = router;
