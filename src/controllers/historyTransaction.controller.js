const httpStatus = require('http-status');
const {
  historyTransactionService
} = require('../services');

const getTransWallet = async (req, res) => {
  const address = req.wallet.Address;
  const trans = await historyTransactionService.listTransWallet(address);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: trans
  });
};
const getTransItem = async (req, res) => {
  const {
    item
  } = req.body;
  const address = req.wallet.Address;
  const trans = await historyTransactionService.listTransItem(address, item);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: trans
  });
};

module.exports = {
  getTransWallet,
  getTransItem
};
