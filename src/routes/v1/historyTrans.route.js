const express = require('express');
const validate = require('../../middlewares/validate');
const {
  transValidation
} = require('../../validations');
const {
  historyTransactionController
} = require('../../controllers');
const {
  authJwt
} = require('../../middlewares/jwtAuth');

const router = express.Router();
router.get('/transaction-wallet', authJwt, historyTransactionController.getTransWallet);
router.get('/transaction-item', authJwt,validate(transValidation.Item), historyTransactionController.getTransItem);

module.exports = router;
