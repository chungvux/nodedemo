const Web3 = require('web3')
const Hero_NFT= require('./Hero_NFT')
const Token_HBG= require('./Token_HBG')
const Land_NFT = require('./Land_NFT')
const Web3WsProvider = require("web3-providers-ws")

let web3;
let BSC_SOCKET_RPC;
let ws;
const options = {
    timeout: 30000, // ms

    // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
    headers: {
        authorization: 'Basic username:password'
    },

    clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};
if (process.env.TESTNET) {
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s2.binance.org:8545/"))

    ws= new Web3(new Web3.providers.WebsocketProvider('wss://speedy-nodes-nyc.moralis.io/34f94c382f6d247db268e04f/bsc/testnet/ws'))
    //BSC_SOCKET_RPC = "wss://mainnet.infura.io/ws/v3/5dd59101b48f43ff8d11621e9a425220"
}

module.exports = {
    heroContract:new web3.eth.Contract(Hero_NFT.ABI,Hero_NFT.Address),
    tokenHBGContract : new web3.eth.Contract(Token_HBG.ABI,Token_HBG.Address),
    landContract:new web3.eth.Contract(Land_NFT.ABI,Land_NFT.Address),
    tokenHBGSocket: new ws.eth.Contract(Token_HBG.ABI,Token_HBG.Address),
    heroSocket: new ws.eth.Contract(Hero_NFT.ABI,Hero_NFT.Address),
    landSocket: new ws.eth.Contract(Land_NFT.ABI,Land_NFT.Address),
}
