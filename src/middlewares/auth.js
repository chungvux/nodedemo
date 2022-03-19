const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {
  roleRights
} = require('../config/roles');
var JWT = require('jsonwebtoken')
const config = require('../config/config');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', {
          session: false
        }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
      })
      .then(() => next())
      .catch((err) => next(err));
    };

    const verifyJWT = async (Jwt_Token) => {
      try {
        const JWT_SECRET_KEY = config.jwt.secret;

        return JWT.verify(Jwt_Token, JWT_SECRET_KEY)
      } catch (error) {
        throw error
      }
    }

const validateJWT = async function (req, res, next) {
  const {
    authorization
  } = req.headers
  try {
    // No token
    if (!authorization) return res.status(401).json({
      status: false,
      message: `No bearer token attached.`
    })

    // Check format
    if (!authorization.startsWith('Bearer')) return res.status(200).json({
      status: false,
      message: `Not a bearer token.`
    })

    // Get token from header
    const Jwt_Token = authorization.split("Bearer ")[1]

    // Null token
    if (!Jwt_Token) return res.status(401).json({
      status: false,
      message: `Invalid token.`
    })
    // Verify token
    const {
      Address
    } = await verifyJWT(Jwt_Token)

    // Get user from token
    const user = await UserModel.findOne({
      Address,
      Jwt_Token
    }).select('-__v -Jwt_Token')
    // Not found user
    if (!user) return res.status(401).json({
      status: false,
      message: `Invalid credentials.`
    })

    // Check blocked
    if (user.Blocked) return res.status(200).json({
      status: false,
      message: `You are is blocked.`
    })

    // Assign to req
    req.User = user

    next()
  } catch (error) {
    console.log(error)
    error.statusCode = 200
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }
}

module.exports = {
  auth,
  validateJWT,
  verifyJWT
};
