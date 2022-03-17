const {
  HistoryLogin
} = require('../models');

/**
   @param {string} address
   @returns {Promise<listUserLogin>}
 */
const listUserLogin = async (address) => {
  const listLogin = await HistoryLogin.find({
    address
  });
  return listLogin
}

/**
   @param {string} address
   @returns {Promise<login>}
 */
const writeHistoryLogin = async (address) => {
  const login = await new HistoryLogin({
    address,
    loginTime: new Date().getTime(),
    isLogin: true
  }).save();

  return login
}

/**
   @param {string} address
   @param {string} idHistory
   @returns {Promise<logout>}
 */
const writeHistoryLogout = async (address, idHistory) =>
{
  const logout = await new HistoryLogin({
    _id: idHistory,
    address,
    logoutTime: new Date().getTime(),
    isLogin: false
  }).save();

  return logout
}

module.exports = {
  listUserLogin,
  writeHistoryLogin,
  writeHistoryLogout
}
