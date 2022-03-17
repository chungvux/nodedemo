const {
  HistoryTransaction
} = require('../models');

/**
   @param {string} address
   @returns {Promise<listTrans>}
 */
const listTransWallet = async (address) => {
  const listTrans = await HistoryTransaction.find({
    address
  });
  return listTrans;
};

/**
   @param {string} item
   @param {string} address
   @returns {Promise<listTrans>}
 */
const listTransItem = async (address, item) => {
  const listTrans = await HistoryTransaction.find({
    item,
    address
  });
  return listTrans;
};

module.exports = {
  listTransWallet,
  listTransItem
};
