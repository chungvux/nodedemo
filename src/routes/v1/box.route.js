const express = require('express');
const validate = require('../../middlewares/validate');
const {
  boxValidation,
  userValidation
} = require('../../validations');
const {
  boxController
} = require('../../controllers');
const {
  authJwt
} = require('../../middlewares/jwtAuth');

const router = express.Router();

router.get('/all-box', boxController.getAllBoxes);
router.get('/shop-box', boxController.shopBoxes);
router.post('/user-box', authJwt, validate(userValidation.getAddress), boxController.getUserBoxes);
router.post('/hero/:tokenId', authJwt, boxController.openBox);

module.exports = router;
