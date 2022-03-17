const httpStatus = require('http-status');
const {
  walletService
} = require('../services');

const getWallets = async (req, res) =>
{
  const wallets = await walletService.listWallets();
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: wallets
  });
};
const getWalletsUser = async (req, res) =>
{
  const address = req.wallet.Address;
  const wallets = await walletService.listWalletsUser(address);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: wallets
  });
};
const getDetailWallets = async (req, res) =>
{
  const {
    idWallet
  } = req.body;
  const wallet = await walletService.listWallets(idWallet);
  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: wallet
  });
};

module.exports = {
  getWallets,
  getWalletsUser,
  getDetailWallets
};
