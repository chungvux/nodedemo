const Web3 = require('web3')

const web3 = process.env.TESTNET?new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/"):web3 = new Web3('https://bsc-dataseed1.binance.org/')


module.exports = web3