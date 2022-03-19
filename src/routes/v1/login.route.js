const express = require('express');
const { loginController } = require('../../controllers');
// const validate = require('../../middlewares/validate');

const router = express.Router();


router.route('/email').post(loginController.loginWithEmail);
router.route('/wallet').post(loginController.loginWithAddress);

module.exports = router;
