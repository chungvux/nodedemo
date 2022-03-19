const Joi = require('joi');
const {
  password
} = require('./custom.validation');
const {
  web3
} = require('../Function/web3')

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const registerEmailSchema = Joi.object({
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.pattern': `Password is not correct`,
      'any.required': `Password is required`
    }),

  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    })
    .messages({
      'string.email': `Email is not correct`,
      'any.required': `Email is required`,
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Email password cannot be an empty field`,

    })
})

const changePasswordSchema = Joi.object({
  current_password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'any.required': `Current password is required`,
      'string.base': `Current password should be a type of 'text'`,
      'string.pattern': `Current password is not corect format`,
      'string.empty': `Current password cannot be an empty field`,

    }),

  new_password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'any.required': `New password is required`,
      'string.base': `New password should be a type of 'text'`,
      'string.pattern': `New password is not corect format`,
      'string.empty': `New password cannot be an empty field`,

    }),

})

const changeUsernameSchema = Joi.object({
  username: Joi.string()
    .required()
    .max(30)
    .min(5)
    .regex(/^(?![ ]+$)[a-zA-Z0-9 ]*$/)
    .messages({
      'string.required': `Username is required`,
      'string.min': `Username minimum 5 character`,
      'string.max': `Username maximum 30 character`,
      'string.regex': `Username is not correct format`,
      'string.empty': `Username cannot be an empty field`,

    }),

})

async function loginAddressValidate(req, res, next) {
  try {
    var {
      wallet
    } = req.body
    var check_address = await web3.utils.isAddress(wallet)
    if (!check_address)
      return res.status(200).json({
        status: false,
        message: `Address is not correct.`
      })
    next()
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  registerEmailSchema,
  changePasswordSchema,
  changeUsernameSchema,
  loginAddressValidate
};
