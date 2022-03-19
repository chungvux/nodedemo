const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const {
  TreeContract
} = require('../models');

const authJwt = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: false,
      message: 'No token Bearer'
    })
  }
  if (!token.startsWith('Bearer')) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: 'Token start with Bearer'
    })
  }
  token = token.split(' ')[1];

  try {
    const {
      Address,
    } = jwt.verify(token, config.jwt.secret);
    req.wallet = await TreeContract.findOne({
      Address: Address
    });
    next();
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({
      stauts: false,
      message: err
    });
  }
};

const generateJWT = (Address) => {
  try {
    return jwt.sign({
      Address
    }, config.jwt.secret, {
      expiresIn: config.jwt.accessExpirationMinutes
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authJwt,
  generateJWT,
};
