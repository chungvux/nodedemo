const express = require('express');
const {
  clanValidation
} = require('../../validations');
const validate = require('../../middlewares/validate');
const {
  clanController
} = require('../../controllers');
const {
  authJwt
} = require('../../middlewares/jwtAuth');

const router = express.Router();

router.get('/', authJwt, clanController.getClan);
router.get('/get-clan', authJwt, clanController.getOneClan);
router.get('/search', authJwt, validate(clanValidation.search), clanController.search);
router.post('/create', authJwt, validate(clanValidation.create), clanController.createClan);
router.post('/attend', authJwt, clanController.attendClan);
router.post('/approve', authJwt, clanController.approveMember);

module.exports = router;
