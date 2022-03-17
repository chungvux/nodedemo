const httpStatus = require('http-status');
const {
  historyLoginService
} = require('../services');

const getUserLogin = async (req, res) =>
{
  const address = req.wallet.Address;
  const login = await historyLoginService.listUserLogin(address);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: login
  });
};

module.exports = {
  getUserLogin
};
