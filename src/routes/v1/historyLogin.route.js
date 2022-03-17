const express = require('express');
const validate = require('../../middlewares/validate');
const {
  historyLoginController
} = require('../../controllers');
const {
  authJwt
} = require('../../middlewares/jwtAuth');

const router = express.Router();

router.get('/login', authJwt, historyLoginController.getUserLogin);

module.exports = router;
