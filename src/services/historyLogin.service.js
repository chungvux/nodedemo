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

const compareCode = async (address, code) => {
  let isCode = false;
  const login = await HistoryLogin.findOne({
    address,
    isLogin: true
  });
  if (login) isCode = true;
  return isCode
}

/**
   @param {string} address
   @returns {Promise<login>}
 */
const writeHistoryLogin = async (address, code) => {
  const login = await new HistoryLogin({
    address,
    loginTime: new Date().getTime(),
    isLogin: true,
    code
  }).save();
}

/**
   @param {string} address
   @param {string} idHistory
   @returns {Promise<logout>}
 */
const writeHistoryLogout = async (address) =>
{
  let isLogout = false;
  const login = await HistoryLogin.findOne({
    address,
    isLogin: true
  });
  if (login) {
    login.logoutTime = new Date().getTime();
    login.isLogin = false;
    login.code = "refresh";
    await login.save();
    isLogout = true;
  }
  return isLogout
}

module.exports = {
  listUserLogin,
  writeHistoryLogin,
  writeHistoryLogout,
  compareCode
}
