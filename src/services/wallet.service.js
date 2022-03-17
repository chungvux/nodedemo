const {
  Tree
} = require('../models');
const ApiError = require('../utils/ApiError');

const listWallets = async () =>
{
  const wallets = await Tree.find();
  return wallets;
};

const listWalletsUser = async (address) =>
{
  const wallets = await Tree.find({
    Address: address
  });
  return wallets;
};
const detailWallet = async (idWallet) =>
{
  const wallet = await Tree.find({
    _id: idWallet
  });
  return wallet;
};

module.exports = {
  listWallets,
  listWalletsUser,
  detailWallet
};
