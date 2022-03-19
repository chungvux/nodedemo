const express = require('express');
const {
  loginAddress,
  updateEmail,
  listUser,
  Register,
  LoginEmail,
  infoUser,
  changePassword,
  changeEmail,
  registerSystem,
  changeUsername
} = require('../../controllers/auth.controller')
const {
  loginAddressValidate
} = require('../../validations/auth.validation')
const {
  validateJWT
} = require('../../middlewares/auth')

const router = express.Router();
router.post('/login/email', LoginEmail)
router.post('/sign', loginAddressValidate, loginAddress)
router.post('/update', validateJWT, updateEmail)
router.post('/list', validateJWT, listUser)
router.post('/register/system', registerSystem)
router.post('/register', Register)
router.get('/info', validateJWT, infoUser)
router.post('/password/change', validateJWT, changePassword)
router.post('/email/change', validateJWT, changeEmail)
router.post('/username/change', validateJWT, changeUsername)

module.exports = router;
