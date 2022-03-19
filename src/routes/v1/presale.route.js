const express = require('express');
const {
  getInfo,
  getUnlockSchedule,
  postBuyToken,
  postClaim
} = require('../../controllers/auth.controller');
const {
  validateJWT
} = require('../../middlewares/auth')

const router = express.Router();

router.get('/info', getInfo)
router.post('/unlock-schedule', validateJWT, getUnlockSchedule)
router.post('/buy-token', validateJWT, postBuyToken)
router.post('/claim', validateJWT, postClaim)

module.exports = router;
