const express = require('express');
const validate = require('../../middlewares/validate');
const {
  walletValidation
} = require('../../validations');
const {
  walletController
} = require('../../controllers');

const router = express.Router();

router.get('/wallet', walletController.getWallets);
router.get('/userwallet', walletController.getWalletsUser);
router.get('/detailwallet', validate(walletValidation.IdWallet), walletController.getDetailWallets);

module.exports = router;
